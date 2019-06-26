const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    //list all accounts
    accounts = await web3.eth.getAccounts();

    //use account to deploy contract
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    await factory.methods.createCampaign(web3.utils.toWei('0.1', 'ether')).send({
        from: accounts[0],
        gas: '1000000'
    });

   [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );

});

describe('Campaigns', () => {
    it('deploys a factory', () => {
        assert.ok(factory.options.address);
    });

    it('deploys a campaign', () => {
        assert.ok(campaign.options.address);
    });

    it('correctly sets campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allows money to be contributed and marks as approver', async () => {
        await campaign.methods.contribute().send({
            value: web3.utils.toWei('0.11', 'ether'),
            from: accounts[1]
        });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    it('requires minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({ from: accounts[0], value: web3.utils.toWei('0.08', 'ether') });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('allows manager to create request', async () => {
        await campaign.methods
            .createRequest('Purchase Supplies', web3.utils.toWei('0.1', 'ether'), accounts[1])
            .send({
                from: accounts[0],
                gas: '1000000'
            });
        
        const request = await campaign.methods.requests(0).call();
        assert.equal('Purchase Supplies', request.description)
    });

    it('processes requests', async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        await campaign.methods
            .createRequest('Purchase Supplies', web3.utils.toWei('5', 'ether'), accounts[1])
            .send({ from: accounts[0], gas: '1000000' });

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);
        assert(balance > 104);
    });

});