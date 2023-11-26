const User = require('./userModel');
const RoleAccessCode = require('./roleAccessCodeModel');
const Tryout = require('./tryoutModel');
const TryoutQuestion = require('./tryoutQuestionModel');
const UserRoleAccess = require('./userRoleAccessModel');
const SubjectMatter = require('./subjectMatterModel');
const SubjectMatterFile = require('./subjectMatterFileModel');
const CourseHierarchy = require('./courseHierarchyModel');

User.belongsToMany(RoleAccessCode, { through: UserRoleAccess, foreignKey: 'user_id', otherKey: 'role_access_code_id' });
Tryout.belongsTo(RoleAccessCode, { foreignKey: 'role_access_code_id' });
Tryout.hasMany(TryoutQuestion, { foreignKey: 'tryout_id', as: 'tryout_questions', required: false });
TryoutQuestion.belongsTo(Tryout, { foreignKey: 'tryout_id' });
SubjectMatter.hasMany(SubjectMatterFile, { foreignKey: 'subject_matter_id', as: 'subject_matter_files' });
SubjectMatterFile.belongsTo(SubjectMatter, { foreignKey: 'subject_matter_id', as: 'subject_matter' });
RoleAccessCode.belongsToMany(User, { through: UserRoleAccess, foreignKey: 'role_access_code_id', otherKey: 'user_id' });
RoleAccessCode.belongsTo(CourseHierarchy, { foreignKey: 'class_id', targetKey: 'id', as: 'class' });
RoleAccessCode.belongsTo(CourseHierarchy, { foreignKey: 'subject_id', targetKey: 'id', as: 'subject' });
RoleAccessCode.belongsTo(CourseHierarchy, { foreignKey: 'school_id', targetKey: 'id', as: 'school' });
RoleAccessCode.belongsTo(CourseHierarchy, { foreignKey: 'curriculum_id', targetKey: 'id', as: 'curriculum' });

module.exports = {
  User,
  RoleAccessCode,
  UserRoleAccess,
  Tryout,
  TryoutQuestion,
  SubjectMatter,
  SubjectMatterFile,
  CourseHierarchy
};