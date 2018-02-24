import {assert} from 'chai';

import {Resource} from 'project';
import {ContractContextDefinition} from 'truffle';
import {ResourceHelper} from './helpers/resource.helper';
import {ResourceTestContext} from './resource/context';
import {
    testAddMintingManager,
    testMint
} from './resource/mintableresource.test';

declare const contract: ContractContextDefinition;

contract('ResourceToken', (accounts: Address[]) => {
    const owner = accounts[9];
    let resource: Resource;
    const resourceHelper = new ResourceHelper(owner);

    describe('#ctor', () => {
        it('should create contract', async () => {
            resource = await resourceHelper.createResourceContract();
            assert.isOk(resource);
        });
    });

    context('Given deployed token contract', () => {
        const ctx: ResourceTestContext = new ResourceTestContext(
            accounts.filter(acc => acc !== owner),
            owner
        );

        beforeEach(async () => {
            ctx.token = await resourceHelper.createResourceContract();
        });

        describe('MintableResource', () => {
            describe('#mint', () => testMint(ctx));
            describe('#addMintingManager', () => testAddMintingManager(ctx));
        });
    });
});
