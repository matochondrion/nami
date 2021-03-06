const createSecurityGroup = require('../util/createSecurityGroup');
const getDefaultVpcId = require('../util/getDefaultVpcId');

module.exports = async function deploySecurityGroup(resourceName, securityGroupType) {
  const defaultVpcID = await getDefaultVpcId();
  let groupName;
  let description;

  if (securityGroupType === 'lambda') {
    description = 'Security Group for Post Queue Lambda in Nami Framework';
    groupName = `${resourceName}PostLambdaSecurityGroup`;
  } else if (securityGroupType === 'ec2') {
    description = 'Security Group for EC2 Instance in Nami Framework';
    groupName = `${resourceName}EC2SecurityGroup`;
  }

  const SecurityGroupId = await createSecurityGroup(description, groupName, defaultVpcID);
  return SecurityGroupId;
};
