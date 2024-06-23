const { Alchemy, Network } = require('alchemy-sdk');
const axios = require('axios');
const fs = require('fs');
const Web3 = require('web3').default;
const crypto = require('crypto');
const whatsabi = require('@shazow/whatsabi');

const API_KEY = 'YMUXA73Z998GXD786UT3SCFA2HUYZMZUVD';

const config = {
    apiKey: "1OO-GIHJEK2UCb1qo1aN2EPzYaxcYY5z",
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/2f66539394044e1c9b3001e6e7a50b9f"));

const nameABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

const tokenSymbolABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

const totalSupplyABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

const decimalsABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "type": "function"
    }
];


async function formatSupply(supply, decimals) {
    let tokenDecimalFloat = parseFloat(decimals);
    let totalSupplyfloat = parseFloat(supply);
    let divisor = parseFloat(10 ** tokenDecimalFloat);
    let quotient = parseFloat(totalSupplyfloat / divisor);
    let supplyResolvido = quotient.toString().split('.')[0];

    const abbreviations = ["", "K", "M", "B", "T"];
    let index = 0;
    while (supplyResolvido >= 1000 && index < abbreviations.length - 1) {
        supplyResolvido /= 1000;
        index++;
    }

    return `${supplyResolvido.toFixed(2)}${abbreviations[index]}`;
}

async function getChecksum(address) {
    const contractCode = await web3.eth.getCode(address);
    const selectors = whatsabi.selectorsFromBytecode(contractCode);
    const selectorsJson = JSON.stringify(selectors);
    const hash = crypto.createHash('sha256').update(selectorsJson).digest('hex').substring(0, 8);

    if (hash === 'ad9bd988') { return `#${hash} METADROPS`; }
    else if (hash === '64959b30') { return `#${hash} RYOSHI C.A`; }

    return `#${hash}`;
}

function escapeMarkdown(text) {
    return text.replace(/[-[\]{}()*+?.!,\\^$|#\s]/g, '\\$&');
}

async function getDeployerInfo(walletAddress) {
    try {
        const [balance, nonce] = await Promise.all([
            web3.eth.getBalance(walletAddress),
            web3.eth.getTransactionCount(walletAddress),
        ]);

        const balanceInEther = web3.utils.fromWei(balance, 'ether');
        const balanceFormatted = parseFloat(balanceInEther).toFixed(2);
        return `${balanceFormatted} ETH (${nonce} TXs)`;
    } catch (error) {
        console.error('Error getting Deployer info', error);
    }
}

async function getSenders(DEPLOYER) {
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${DEPLOYER}&sort=asc&apikey=${API_KEY}`;
    const response = await axios.get(url);

    if (response.data.status !== "1") {
        console.error('ERROR GETTING TRANSACTIONS', response.data.message);
        return [];
    }

    const incomingTransactions = response.data.result.filter(tx => tx.to.toLowerCase() === DEPLOYER.toLowerCase());

    if (incomingTransactions.length === 0) {
        return [];
    }

    const highestValueTx = incomingTransactions.reduce((prevTx, currentTx) =>
        BigInt(currentTx.value) > BigInt(prevTx.value) ? currentTx : prevTx
    );
    const label = await getAddressLabel(highestValueTx.from);
    return label;
}

async function getAddressLabel(address) {
    const binance = [
        "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be",
        "0x85b931a32a0725be14285b66f1a22178c672d69b",
        "0x708396f17127c42383e3b9014072679b2f60b82f",
        "0xe0f0cfde7ee664943906f17f7f14342e76a5cec7",
        "0x8f22f2063d253846b53609231ed80fa571bc0c8f",
        "0x28c6c06298d514db089934071355e5743bf21d60",
        "0x21a31ee1afc51d94c2efccaa2092ad1028285549",
        "0xdfd5293d8e347dfe59e90efd55b2956a1343963d",
        "0x56eddb7aa87536c09ccc2793473599fd21a8b17f",
        "0x9696f59e4d72e237be84ffd425dcad154bf96976",
        "0x4d9ff50ef4da947364bb9650892b2554e7be5e2b",
        "0xd551234ae421e3bcba99a0da6d736074f22192ff",
        "0x4976a4a02f38326660d17bf34b431dc6e2eb2327",
        "0xd88b55467f58af508dbfdc597e8ebd2ad2de49b3",
        "0x7dfe9a368b6cf0c0309b763bb8d16da326e8f46e",
        "0x345d8e3a1f62ee6b1d483890976fd66168e390f2",
        "0xc3c8e0a39769e2308869f7461364ca48155d1d9e",
        "0x2e581a5ae722207aa59acd3939771e7c7052dd3d",
        "0x44592b81c05b4c35efb8424eb9d62538b949ebbf",
        "0xa344c7ada83113b3b56941f6e85bf2eb425949f3",
        "0x5a52e96bacdabb82fd05763e25335261b270efcb",
        "0x06a0048079ec6571cd1b537418869cde6191d42d",
        "0x564286362092d8e7936f0549571a803b203aaced",
        "0x892e9e24aea3f27f4c6e9360e312cce93cc98ebe",
        "0x00799bbc833d5b168f0410312d2a8fd9e0e3079c",
        "0x141fef8cd8397a390afe94846c8bd6f4ab981c48",
        "0x50d669f43b484166680ecc3670e4766cdb0945ce",
        "0x2f7e209e0f5f645c7612d7610193fe268f118b28",
        "0xd9d93951896b4ef97d251334ef2a0e39f6f6d7d7",
        "0x0681d8db095565fe8a346fa0277bffde9c0edbbf",
        "0x294b9b133ca7bc8ed2cdd03ba661a4c6d3a834d9",
        "0x5d7f34372fa8708e09689d400a613eee67f75543",
        "0xfe9e8709d3215310075d67e3ed32a380ccf451c8",
        "0x4e9ce36e442e55ecd9025b9a6e0d88485d628a67",
        "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8",
        "0xf977814e90da44bfa03b6295a0616a897441acec",
        "0x001866ae5b3de6caa5a51543fd9fb64f524f5478",
        "0x8b99f3660622e21f2910ecca7fbe51d654a1517d",
        "0xab83d182f3485cf1d6ccdd34c7cfef95b4c08da4",
        "0xc365c3315cf926351ccaf13fa7d19c8c4058c8e1",
        "0x61189da79177950a7272c88c6058b96d4bcd6be2",
        "0xc9a2c4868f0f96faaa739b59934dc9cb304112ec",
        "0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503",
        "0xb8c77482e45f1f44de1745f52c74426c631bdd52",
        "0x0b95993a39a363d99280ac950f5e4536ab5c5566",
        "0x1074253202528777561f83817d413e91bfa671d4",
        "0x170c7c38419767816cc7ec519da67d1a4dc43826",
        "0x9430801ebaf509ad49202aabc5f5bc6fd8a3daf8",
        "0x8f80c66c70cbc52009babb04c1cadf9b40109289",
        "0x15ece0d7de25436bcfcf3d62a9085ddc7838aee9",
        "0x2f47a1c2db4a3b78cda44eade915c3b19107ddcc",
        "0xbdd75a97c29294ff805fb2fee65abd99492b32a8",
        "0x043a80999cee3711d372fb878768909fbe7f71e6",
        "0xb3f923eabaf178fc1bd8e13902fc5c61d3ddef5b",
        "0xd061f41ae89843cce7e32df046d50f4cf02fe706"
    ];

    const mexc = '0x75e89d5979e4f6fba9f97c104c2f0afb3f1dcb88';
    const byBit = '0xf89d7b9c864f589bbf53a82105107622b35eaa40';
    const changeNow = '0x077d360f11d220e4d5d831430c81c26c9be7c4a4';
    const fixedFloat = '0x4e5b2e1dc63f6b91cb6cd759936495434c7e972f';
    const kuCoin = [
        "0x2b5634c42055806a59e9107ed44d43c426e58258",
        "0xcad621da75a66c7a8f4ff86d30a2bf981bfc8fdd",
        "0xec30d02f10353f8efc9601371f56e808751f396f",
        "0xd89350284c7732163765b23338f2ff27449e0bf5",
        "0x689c56aef474df92d44a1b70850f808488f9769c",
        "0xa1d8d972560c2f8144af871db508f0b0b10a3fbf",
        "0x4ad64983349c49defe8d7a4686202d24b25d0ce8",
        "0xe59cd29be3be4461d79c0881d238cbe87d64595a",
        "0xf16e9b0d03470827a95cdfd0cb8a8a3b46969b91"
    ];
    const poloniex = [
        "0x32be343b94f860124dc4fee278fdcbd38c102d88",
        "0xa910f92acdaf488fa6ef02174fb86208ad7722ba"
    ];
    const coinbase = [
        "0x71660c4005ba85c37ccec55d0c4493e66fe775d3",
        "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
        "0x77696bb39917c91a0c3908d577d5e322095425ca",
        "0x7c195d981abfdc3ddecd2ca0fed0958430488e34",
        "0x95a9bd206ae52c4ba8eecfc93d18eacdd41c88cc",
        "0xb739d0895772dbb71a89a3754a160269068f0d45",
        "0x503828976d22510aad0201ac7ec88293211d23da",
        "0xddfabcdc4d8ffc6d5beaf154f18b778f892a0740",
        "0x3cd751e6b0078be393132286c442345e5dc49699",
        "0xb5d85cbf7cb3ee0d56b3bb207d5fc4b82f43f511",
        "0xeb2629a2734e272bcc07bda959863f316f4bd4cf"
    ];
    const okex = '0xbf94f0ac752c739f623c463b5210a7fb2cbb420b';
    const gateIo = '0x0d0707963952f2fba59dd06f2b425ace40b492fe';
    const kraken = [
        "0x2910543af39aba0cd09dbb2d50200b3e800a63d2",
        "0xae2d4617c862309a3d75a0ffb358c7a5009c673f",
        "0x43984d578803891dfa9706bdeee6078d80cfc79e",
        "0x66c57bf505a85a74609d2c83e94aabb26d691e1f",
        "0xa83b11093c858c86321fbc4c20fe82cdbd58e09e",
        "0x0a869d79a7052c7f1b55a8ebabbea3420f0d1e13",
        "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0",
        "0xfa52274dd61e1643d2205169732f29114bc240b3",
        "0x89e51fa8ca5d66cd220baed62ed01e8951aa7c40",
        "0xc6bed363b30df7f35b601a5547fe56cd31ec63da",
        "0xa24787320ede4cc19d800bf87b41ab9539c4da9d"
    ];
    const stake = '0x974caa59e49682cda0ad2bbe82983419a2ecc400';
    const cryptoCom = [
        '0x6262998ced04146fa42253a5c0af90ca02dfd2a3',
        '0x46340b20830761efd32832a74d7169b29feb9758',
        '0x72a53cdbbcc1b9efa39c834a540550e23463aacb',
        '0xcffad3200574698b78f32232aa9d63eabd290703'
    ];

    if (binance.includes(address)) {
        return "BINANCE";
    } else if (mexc == address) {
        return "MEXC";
    } else if (changeNow == address) {
        return "CHANGENOW";
    } else if (fixedFloat == address) {
        return "FIXEDFLOAT";
    } else if (kuCoin.includes(address)) {
        return "KUCOIN";
    } else if (poloniex.includes(address)) {
        return "POLONIEX";
    } else if (coinbase.includes(address)) {
        return "COINBASE";
    } else if (byBit == address) {
        return "BYBIT";
    } else if (gateIo == address) {
        return "GATE.IO";
    } else if (okex == address) {
        return "OKx";
    } else if (kraken.includes(address)) {
        return "KRAKEN";
    } else if (stake == address) {
        return "STAKE";
    } else if (cryptoCom.includes(address)) {
        return "CRYPTO.COM";
    } else {
        return "Normal Wallet";
    }
}


const main = async () => {
    try {
        let response = await alchemy.core.getBlockWithTransactions("latest");

        console.log("Bloco atual:", response.number);

        let transactions = response.transactions;

        for (let i = 0; i < transactions.length; i++) {
            let transaction = transactions[i];

            if (transaction.creates != null) {
                const contractInfo = new web3.eth.Contract([...nameABI, ...tokenSymbolABI, ...totalSupplyABI, ...decimalsABI], transaction.creates);
                const [tokenName, tokenSymbol, totalSupplyBigInt, decimalsBigInt] = await Promise.all([
                    contractInfo.methods.name().call(),
                    contractInfo.methods.symbol().call(),
                    contractInfo.methods.totalSupply().call(),
                    contractInfo.methods.decimals().call()
                ]);

                let supplyCorreto = await formatSupply(totalSupplyBigInt, decimalsBigInt);
                let checksum = await getChecksum(transaction.creates);
                const deployerWallet = transaction.from;
                const deployerInfos = await getDeployerInfo(deployerWallet);
                const deployerLabel = await getSenders(deployerWallet);

                const tokenData = {
                    name: tokenName,
                    symbol: tokenSymbol,
                    address: transaction.creates,
                    supply: supplyCorreto,
                    checksum: checksum,
                    deployerWallet: deployerWallet,
                    deployerInfo: deployerInfos,
                    deployerLabel: deployerLabel
                };

                // Enviar dados para a API
                await axios.post('http://localhost:3000/tokens', tokenData);

                fs.appendFile('armazenamentoTokens.ndjson', JSON.stringify(tokenData) + '\n', (err) => {
                    if (err) throw err;
                });

                console.log("Token data sent to API and stored in NDJSON file:", tokenData);
            }
        }
    } catch (error) {
        console.error("Erro ao obter o bloco:", error);
    }
};

setInterval(() => {
    main().catch(error => {
        console.error("Erro ao executar a função main:", error);
    });
}, 10000);