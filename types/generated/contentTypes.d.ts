import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String & Attribute.Configurable;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiActivityActivity extends Schema.CollectionType {
  collectionName: 'activities';
  info: {
    singularName: 'activity';
    pluralName: 'activities';
    displayName: 'Activities';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    activity_name: Attribute.String;
    image: Attribute.Media;
    short_description: Attribute.Text;
    featured_destination: Attribute.Relation<
      'api::activity.activity',
      'manyToOne',
      'api::featured-destination.featured-destination'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::activity.activity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::activity.activity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAddressAddress extends Schema.CollectionType {
  collectionName: 'addresses';
  info: {
    singularName: 'address';
    pluralName: 'addresses';
    displayName: 'address';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    city: Attribute.String;
    street: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::address.address',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::address.address',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdvisorAdvisor extends Schema.CollectionType {
  collectionName: 'advisors';
  info: {
    singularName: 'advisor';
    pluralName: 'advisors';
    displayName: 'Advisor';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Years_of_experience: Attribute.Integer;
    passport_no: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 10;
      }>;
    advisor_group_an_advisor_belongs: Attribute.Relation<
      'api::advisor.advisor',
      'oneToMany',
      'api::advisor-group-an-advisor-belong.advisor-group-an-advisor-belong'
    >;
    admin_user: Attribute.Relation<
      'api::advisor.advisor',
      'oneToOne',
      'admin::user'
    >;
    Field_of_specialization: Attribute.Enumeration<['Agriculture', 'IT']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::advisor.advisor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::advisor.advisor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdvisorGroupAnAdvisorBelongAdvisorGroupAnAdvisorBelong
  extends Schema.CollectionType {
  collectionName: 'advisor_group_an_advisor_belongs';
  info: {
    singularName: 'advisor-group-an-advisor-belong';
    pluralName: 'advisor-group-an-advisor-belongs';
    displayName: 'advisor_group_an_advisor_belong';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    advisor_id: Attribute.Relation<
      'api::advisor-group-an-advisor-belong.advisor-group-an-advisor-belong',
      'manyToOne',
      'api::advisor.advisor'
    >;
    advisor_group_id: Attribute.Relation<
      'api::advisor-group-an-advisor-belong.advisor-group-an-advisor-belong',
      'manyToOne',
      'api::board-vs-advisor-group.board-vs-advisor-group'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::advisor-group-an-advisor-belong.advisor-group-an-advisor-belong',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::advisor-group-an-advisor-belong.advisor-group-an-advisor-belong',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAuditorsForCountryAuditorsForCountry
  extends Schema.CollectionType {
  collectionName: 'auditors_for_countries';
  info: {
    singularName: 'auditors-for-country';
    pluralName: 'auditors-for-countries';
    displayName: 'Auditors_for_country';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    conservation_results_report: Attribute.Text & Attribute.Required;
    p_country_ids: Attribute.Relation<
      'api::auditors-for-country.auditors-for-country',
      'oneToMany',
      'api::participating-country.participating-country'
    >;
    auditor_ids: Attribute.Relation<
      'api::auditors-for-country.auditors-for-country',
      'oneToMany',
      'api::auditors-identification.auditors-identification'
    >;
    escrow_id: Attribute.Relation<
      'api::auditors-for-country.auditors-for-country',
      'oneToOne',
      'api::escrow-account.escrow-account'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::auditors-for-country.auditors-for-country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::auditors-for-country.auditors-for-country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAuditorsIdentificationAuditorsIdentification
  extends Schema.CollectionType {
  collectionName: 'auditors_identifications';
  info: {
    singularName: 'auditors-identification';
    pluralName: 'auditors-identifications';
    displayName: 'auditors_identification';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    auditor_name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::auditors-identification.auditors-identification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::auditors-identification.auditors-identification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBeneficiaryBeneficiary extends Schema.CollectionType {
  collectionName: 'beneficiaries';
  info: {
    singularName: 'beneficiary';
    pluralName: 'beneficiaries';
    displayName: 'Beneficiary';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name_of_beneficiary: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    beneficiary_type: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    amount_allocated: Attribute.Decimal;
    purpose: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    date_issued: Attribute.DateTime;
    address: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    Previous_years_budget: Attribute.Decimal;
    trust_fund_id: Attribute.Relation<
      'api::beneficiary.beneficiary',
      'manyToOne',
      'api::trust-fund-country.trust-fund-country'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::beneficiary.beneficiary',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::beneficiary.beneficiary',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBoardADirectorBelongsToBoardADirectorBelongsTo
  extends Schema.CollectionType {
  collectionName: 'board_a_director_belongs_tos';
  info: {
    singularName: 'board-a-director-belongs-to';
    pluralName: 'board-a-director-belongs-tos';
    displayName: 'Board_a_director_belongs_to';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    trust_fund_a_board_manage: Attribute.Relation<
      'api::board-a-director-belongs-to.board-a-director-belongs-to',
      'manyToOne',
      'api::trust-fund-a-board-manage.trust-fund-a-board-manage'
    >;
    director_id: Attribute.Relation<
      'api::board-a-director-belongs-to.board-a-director-belongs-to',
      'manyToOne',
      'api::director.director'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::board-a-director-belongs-to.board-a-director-belongs-to',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::board-a-director-belongs-to.board-a-director-belongs-to',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBoardVsAdvisorGroupBoardVsAdvisorGroup
  extends Schema.CollectionType {
  collectionName: 'board_vs_advisor_groups';
  info: {
    singularName: 'board-vs-advisor-group';
    pluralName: 'board-vs-advisor-groups';
    displayName: 'board_vs_advisor_group';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    board_id: Attribute.Relation<
      'api::board-vs-advisor-group.board-vs-advisor-group',
      'oneToOne',
      'api::trust-fund-a-board-manage.trust-fund-a-board-manage'
    >;
    advisor_group_an_advisor_belongs: Attribute.Relation<
      'api::board-vs-advisor-group.board-vs-advisor-group',
      'oneToMany',
      'api::advisor-group-an-advisor-belong.advisor-group-an-advisor-belong'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::board-vs-advisor-group.board-vs-advisor-group',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::board-vs-advisor-group.board-vs-advisor-group',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBondBond extends Schema.CollectionType {
  collectionName: 'bonds';
  info: {
    singularName: 'bond';
    pluralName: 'bonds';
    displayName: 'Bond';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    face_value: Attribute.Float;
    maturity_period: Attribute.Float;
    start_date: Attribute.DateTime;
    end_date: Attribute.DateTime;
    p_country_id: Attribute.Relation<
      'api::bond.bond',
      'oneToMany',
      'api::participating-country.participating-country'
    >;
    bond_classes: Attribute.Relation<
      'api::bond.bond',
      'oneToMany',
      'api::bond-class.bond-class'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::bond.bond', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::bond.bond', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiBondClassBondClass extends Schema.CollectionType {
  collectionName: 'bond_classes';
  info: {
    singularName: 'bond-class';
    pluralName: 'bond-classes';
    displayName: 'Bond_class';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    coupon_rate: Attribute.Float;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bond-class.bond-class',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::bond-class.bond-class',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConservationAreaConservationArea
  extends Schema.CollectionType {
  collectionName: 'conservation_areas';
  info: {
    singularName: 'conservation-area';
    pluralName: 'conservation-areas';
    displayName: 'conservation_area';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    short_description: Attribute.Text & Attribute.Required;
    long_description: Attribute.RichText &
      Attribute.Required &
      Attribute.DefaultTo<'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dis parturient montes nascetur ridiculus mus. Porttitor eget dolor morbi non arcu risus. Cras sed felis eget velit aliquet sagittis id consectetur purus. '>;
    images: Attribute.Media;
    country_id: Attribute.Relation<
      'api::conservation-area.conservation-area',
      'oneToMany',
      'api::country.country'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::conservation-area.conservation-area',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::conservation-area.conservation-area',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactContact extends Schema.CollectionType {
  collectionName: 'contacts';
  info: {
    singularName: 'contact';
    pluralName: 'contacts';
    displayName: 'Contact';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    email: Attribute.String & Attribute.Required;
    phone: Attribute.String;
    message: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCountryCountry extends Schema.CollectionType {
  collectionName: 'countries';
  info: {
    singularName: 'country';
    pluralName: 'countries';
    displayName: 'Country';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    region: Attribute.String;
    g20_country: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCustomerTravelHistoryCustomerTravelHistory
  extends Schema.CollectionType {
  collectionName: 'customer_travel_histories';
  info: {
    singularName: 'customer-travel-history';
    pluralName: 'customer-travel-histories';
    displayName: 'Customer_travel_history';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    arrival_date: Attribute.DateTime & Attribute.Required;
    departure_date: Attribute.DateTime;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::customer-travel-history.customer-travel-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::customer-travel-history.customer-travel-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDirectorDirector extends Schema.CollectionType {
  collectionName: 'directors';
  info: {
    singularName: 'director';
    pluralName: 'directors';
    displayName: 'Director';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    field_of_specialization: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    years_of_experience: Attribute.Integer & Attribute.Required;
    passport_no: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 10;
      }>;
    board_a_director_belongs_tos: Attribute.Relation<
      'api::director.director',
      'oneToMany',
      'api::board-a-director-belongs-to.board-a-director-belongs-to'
    >;
    admin_user: Attribute.Relation<
      'api::director.director',
      'oneToOne',
      'admin::user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::director.director',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::director.director',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEscrowAccountEscrowAccount extends Schema.CollectionType {
  collectionName: 'escrow_accounts';
  info: {
    singularName: 'escrow-account';
    pluralName: 'escrow-accounts';
    displayName: 'Escrow_account';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    p_country_id: Attribute.Relation<
      'api::escrow-account.escrow-account',
      'oneToOne',
      'api::participating-country.participating-country'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::escrow-account.escrow-account',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::escrow-account.escrow-account',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEscrowAccountTransactionEscrowAccountTransaction
  extends Schema.CollectionType {
  collectionName: 'escrow_account_transactions';
  info: {
    singularName: 'escrow-account-transaction';
    pluralName: 'escrow-account-transactions';
    displayName: 'Escrow_account_transaction';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    escrow_id: Attribute.Relation<
      'api::escrow-account-transaction.escrow-account-transaction',
      'oneToMany',
      'api::escrow-account.escrow-account'
    >;
    payment_detail_id: Attribute.Relation<
      'api::escrow-account-transaction.escrow-account-transaction',
      'oneToOne',
      'api::payment-detail.payment-detail'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::escrow-account-transaction.escrow-account-transaction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::escrow-account-transaction.escrow-account-transaction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFeaturedDestinationFeaturedDestination
  extends Schema.CollectionType {
  collectionName: 'featured_destinations';
  info: {
    singularName: 'featured-destination';
    pluralName: 'featured-destinations';
    displayName: 'featured_destination';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    short_description: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dis parturient montes nascetur ridiculus mus. Porttitor eget dolor morbi non arcu risus. Cras sed felis eget velit aliquet sagittis id consectetur purus. '>;
    images: Attribute.Media;
    long_description: Attribute.RichText &
      Attribute.Required &
      Attribute.DefaultTo<'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dis parturient montes nascetur ridiculus mus. Porttitor eget dolor morbi non arcu risus. Cras sed felis eget velit aliquet sagittis id consectetur purus. '>;
    country: Attribute.Relation<
      'api::featured-destination.featured-destination',
      'oneToOne',
      'api::country.country'
    >;
    longitude: Attribute.Float & Attribute.Required;
    latitude: Attribute.Float & Attribute.Required;
    activities: Attribute.Relation<
      'api::featured-destination.featured-destination',
      'oneToMany',
      'api::activity.activity'
    >;
    alternate_image: Attribute.Media;
    annual_visitors: Attribute.Integer;
    area: Attribute.Float;
    rate: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::featured-destination.featured-destination',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::featured-destination.featured-destination',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFeeForG20NationFeeForG20Nation
  extends Schema.CollectionType {
  collectionName: 'fee_for_g20_nations';
  info: {
    singularName: 'fee-for-g20-nation';
    pluralName: 'fee-for-g20-nations';
    displayName: 'fee_for_G20_Nation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    stripe_id: Attribute.String;
    price: Attribute.Float;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::fee-for-g20-nation.fee-for-g20-nation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::fee-for-g20-nation.fee-for-g20-nation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFeeForNonG20NationFeeForNonG20Nation
  extends Schema.CollectionType {
  collectionName: 'fee_for_non_g20_nations';
  info: {
    singularName: 'fee-for-non-g20-nation';
    pluralName: 'fee-for-non-g20-nations';
    displayName: 'fee_non_g20_nation';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    stripe_id: Attribute.String;
    price: Attribute.Float;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::fee-for-non-g20-nation.fee-for-non-g20-nation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::fee-for-non-g20-nation.fee-for-non-g20-nation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGgvFeeGgvFee extends Schema.CollectionType {
  collectionName: 'ggv_fees';
  info: {
    singularName: 'ggv-fee';
    pluralName: 'ggv-fees';
    displayName: 'Fee_neighbouring';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    stripe_id: Attribute.String;
    price: Attribute.Float;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ggv-fee.ggv-fee',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ggv-fee.ggv-fee',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGgvFeeForParticipantCountrieGgvFeeForParticipantCountrie
  extends Schema.CollectionType {
  collectionName: 'ggv_fee_for_participant_countries';
  info: {
    singularName: 'ggv-fee-for-participant-countrie';
    pluralName: 'ggv-fee-for-participant-countries';
    displayName: 'GGV_fee_for_participant_country';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    participating_country: Attribute.Relation<
      'api::ggv-fee-for-participant-countrie.ggv-fee-for-participant-countrie',
      'oneToOne',
      'api::participating-country.participating-country'
    >;
    fee_neighbouring: Attribute.Relation<
      'api::ggv-fee-for-participant-countrie.ggv-fee-for-participant-countrie',
      'oneToOne',
      'api::ggv-fee.ggv-fee'
    >;
    fee_for_g_20_nation: Attribute.Relation<
      'api::ggv-fee-for-participant-countrie.ggv-fee-for-participant-countrie',
      'oneToOne',
      'api::fee-for-g20-nation.fee-for-g20-nation'
    >;
    fee_non_g_20_nation: Attribute.Relation<
      'api::ggv-fee-for-participant-countrie.ggv-fee-for-participant-countrie',
      'oneToOne',
      'api::fee-for-non-g20-nation.fee-for-non-g20-nation'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ggv-fee-for-participant-countrie.ggv-fee-for-participant-countrie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ggv-fee-for-participant-countrie.ggv-fee-for-participant-countrie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInvestmentPurchaseInvestmentPurchase
  extends Schema.CollectionType {
  collectionName: 'investment_purchases';
  info: {
    singularName: 'investment-purchase';
    pluralName: 'investment-purchases';
    displayName: 'Investment_purchase';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    amount_received: Attribute.Decimal;
    date_purchased: Attribute.DateTime;
    bond_ids: Attribute.Relation<
      'api::investment-purchase.investment-purchase',
      'oneToMany',
      'api::bond.bond'
    >;
    investor_bond_buyer_id: Attribute.Relation<
      'api::investment-purchase.investment-purchase',
      'oneToMany',
      'api::investor-bond-buyer.investor-bond-buyer'
    >;
    trust_fund_id: Attribute.Relation<
      'api::investment-purchase.investment-purchase',
      'oneToMany',
      'api::trust-fund-country.trust-fund-country'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::investment-purchase.investment-purchase',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::investment-purchase.investment-purchase',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInvestorBondBuyerInvestorBondBuyer
  extends Schema.CollectionType {
  collectionName: 'investor_bond_buyers';
  info: {
    singularName: 'investor-bond-buyer';
    pluralName: 'investor-bond-buyers';
    displayName: 'Investor_bond_buyer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    organization: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    passport_no: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 10;
      }>;
    admin_user_id: Attribute.Relation<
      'api::investor-bond-buyer.investor-bond-buyer',
      'oneToOne',
      'admin::user'
    >;
    address_id: Attribute.Relation<
      'api::investor-bond-buyer.investor-bond-buyer',
      'oneToMany',
      'api::address.address'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::investor-bond-buyer.investor-bond-buyer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::investor-bond-buyer.investor-bond-buyer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNationalManagerNationalManager
  extends Schema.CollectionType {
  collectionName: 'national_managers';
  info: {
    singularName: 'national-manager';
    pluralName: 'national-managers';
    displayName: 'National_manager';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    country: Attribute.Relation<
      'api::national-manager.national-manager',
      'oneToOne',
      'api::country.country'
    >;
    admin_user: Attribute.Relation<
      'api::national-manager.national-manager',
      'oneToOne',
      'admin::user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::national-manager.national-manager',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::national-manager.national-manager',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiParticipatingCountriesPartnerParticipatingCountriesPartner
  extends Schema.CollectionType {
  collectionName: 'participating_countries_partners';
  info: {
    singularName: 'participating-countries-partner';
    pluralName: 'participating-countries-partners';
    displayName: 'Participating_countries_partner';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    p_country_id: Attribute.Relation<
      'api::participating-countries-partner.participating-countries-partner',
      'oneToMany',
      'api::participating-country.participating-country'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::participating-countries-partner.participating-countries-partner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::participating-countries-partner.participating-countries-partner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiParticipatingCountryParticipatingCountry
  extends Schema.CollectionType {
  collectionName: 'participating_countries';
  info: {
    singularName: 'participating-country';
    pluralName: 'participating-countries';
    displayName: 'Participating_Country';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    country_id: Attribute.Relation<
      'api::participating-country.participating-country',
      'oneToOne',
      'api::country.country'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::participating-country.participating-country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::participating-country.participating-country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPartnerPartner extends Schema.CollectionType {
  collectionName: 'partners';
  info: {
    singularName: 'partner';
    pluralName: 'partners';
    displayName: 'Partner';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    organisation_name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    address: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    years_in_partnership: Attribute.Integer & Attribute.Required;
    participating_country_partner_id: Attribute.Relation<
      'api::partner.partner',
      'oneToMany',
      'api::participating-countries-partner.participating-countries-partner'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::partner.partner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::partner.partner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPaymentDetailPaymentDetail extends Schema.CollectionType {
  collectionName: 'payment_details';
  info: {
    singularName: 'payment-detail';
    pluralName: 'payment-details';
    displayName: 'Payment_detail';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    ggv_fee_for_participant_country_id: Attribute.Relation<
      'api::payment-detail.payment-detail',
      'oneToOne',
      'api::ggv-fee-for-participant-countrie.ggv-fee-for-participant-countrie'
    >;
    visa_holder_id: Attribute.Relation<
      'api::payment-detail.payment-detail',
      'oneToOne',
      'api::visa-holder.visa-holder'
    >;
    amount_paid: Attribute.Decimal & Attribute.Required;
    escrow_account_transaction_id: Attribute.Relation<
      'api::payment-detail.payment-detail',
      'oneToOne',
      'api::escrow-account-transaction.escrow-account-transaction'
    >;
    customer_travel_history_id: Attribute.Relation<
      'api::payment-detail.payment-detail',
      'oneToOne',
      'api::customer-travel-history.customer-travel-history'
    >;
    paid: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::payment-detail.payment-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::payment-detail.payment-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTrustFundABoardManageTrustFundABoardManage
  extends Schema.CollectionType {
  collectionName: 'trust_fund_a_board_manages';
  info: {
    singularName: 'trust-fund-a-board-manage';
    pluralName: 'trust-fund-a-board-manages';
    displayName: 'Trust_fund_a_board_manage';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Trust_fund_ID: Attribute.Relation<
      'api::trust-fund-a-board-manage.trust-fund-a-board-manage',
      'oneToOne',
      'api::trust-fund-country.trust-fund-country'
    >;
    board_a_director_belongs_tos: Attribute.Relation<
      'api::trust-fund-a-board-manage.trust-fund-a-board-manage',
      'oneToMany',
      'api::board-a-director-belongs-to.board-a-director-belongs-to'
    >;
    board_vs_advisor_group: Attribute.Relation<
      'api::trust-fund-a-board-manage.trust-fund-a-board-manage',
      'oneToOne',
      'api::board-vs-advisor-group.board-vs-advisor-group'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::trust-fund-a-board-manage.trust-fund-a-board-manage',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::trust-fund-a-board-manage.trust-fund-a-board-manage',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTrustFundCountryTrustFundCountry
  extends Schema.CollectionType {
  collectionName: 'trust_fund_countries';
  info: {
    singularName: 'trust-fund-country';
    pluralName: 'trust-fund-countries';
    displayName: 'trust_fund_country';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    p_country_id: Attribute.Relation<
      'api::trust-fund-country.trust-fund-country',
      'oneToOne',
      'api::participating-country.participating-country'
    >;
    beneficiaries: Attribute.Relation<
      'api::trust-fund-country.trust-fund-country',
      'oneToMany',
      'api::beneficiary.beneficiary'
    >;
    trust_fund_a_board_manage: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::trust-fund-country.trust-fund-country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::trust-fund-country.trust-fund-country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUserDetailUserDetail extends Schema.CollectionType {
  collectionName: 'user_details';
  info: {
    singularName: 'user-detail';
    pluralName: 'user-details';
    displayName: 'User_detail';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    first_name: Attribute.String;
    last_name: Attribute.String;
    user: Attribute.Relation<
      'api::user-detail.user-detail',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    country: Attribute.Relation<
      'api::user-detail.user-detail',
      'oneToOne',
      'api::country.country'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::user-detail.user-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::user-detail.user-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVisaVisa extends Schema.CollectionType {
  collectionName: 'visas';
  info: {
    singularName: 'visa';
    pluralName: 'visas';
    displayName: 'visa';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    payment_detail_id: Attribute.Relation<
      'api::visa.visa',
      'oneToOne',
      'api::payment-detail.payment-detail'
    >;
    qr_url: Attribute.String;
    status: Attribute.Enumeration<
      ['Active', 'Expired', 'Rejected', 'Under Review']
    > &
      Attribute.DefaultTo<'Active'>;
    qr_image: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::visa.visa', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::visa.visa', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiVisaHolderVisaHolder extends Schema.CollectionType {
  collectionName: 'visa_holders';
  info: {
    singularName: 'visa-holder';
    pluralName: 'visa-holders';
    displayName: 'visa_holder';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    passport_no: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 10;
      }>;
    passport_expiry: Attribute.Date;
    address: Attribute.Relation<
      'api::visa-holder.visa-holder',
      'oneToOne',
      'api::address.address'
    >;
    conservation_areas: Attribute.Relation<
      'api::visa-holder.visa-holder',
      'oneToMany',
      'api::conservation-area.conservation-area'
    >;
    user_detail: Attribute.Relation<
      'api::visa-holder.visa-holder',
      'oneToOne',
      'api::user-detail.user-detail'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::visa-holder.visa-holder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::visa-holder.visa-holder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::activity.activity': ApiActivityActivity;
      'api::address.address': ApiAddressAddress;
      'api::advisor.advisor': ApiAdvisorAdvisor;
      'api::advisor-group-an-advisor-belong.advisor-group-an-advisor-belong': ApiAdvisorGroupAnAdvisorBelongAdvisorGroupAnAdvisorBelong;
      'api::auditors-for-country.auditors-for-country': ApiAuditorsForCountryAuditorsForCountry;
      'api::auditors-identification.auditors-identification': ApiAuditorsIdentificationAuditorsIdentification;
      'api::beneficiary.beneficiary': ApiBeneficiaryBeneficiary;
      'api::board-a-director-belongs-to.board-a-director-belongs-to': ApiBoardADirectorBelongsToBoardADirectorBelongsTo;
      'api::board-vs-advisor-group.board-vs-advisor-group': ApiBoardVsAdvisorGroupBoardVsAdvisorGroup;
      'api::bond.bond': ApiBondBond;
      'api::bond-class.bond-class': ApiBondClassBondClass;
      'api::conservation-area.conservation-area': ApiConservationAreaConservationArea;
      'api::contact.contact': ApiContactContact;
      'api::country.country': ApiCountryCountry;
      'api::customer-travel-history.customer-travel-history': ApiCustomerTravelHistoryCustomerTravelHistory;
      'api::director.director': ApiDirectorDirector;
      'api::escrow-account.escrow-account': ApiEscrowAccountEscrowAccount;
      'api::escrow-account-transaction.escrow-account-transaction': ApiEscrowAccountTransactionEscrowAccountTransaction;
      'api::featured-destination.featured-destination': ApiFeaturedDestinationFeaturedDestination;
      'api::fee-for-g20-nation.fee-for-g20-nation': ApiFeeForG20NationFeeForG20Nation;
      'api::fee-for-non-g20-nation.fee-for-non-g20-nation': ApiFeeForNonG20NationFeeForNonG20Nation;
      'api::ggv-fee.ggv-fee': ApiGgvFeeGgvFee;
      'api::ggv-fee-for-participant-countrie.ggv-fee-for-participant-countrie': ApiGgvFeeForParticipantCountrieGgvFeeForParticipantCountrie;
      'api::investment-purchase.investment-purchase': ApiInvestmentPurchaseInvestmentPurchase;
      'api::investor-bond-buyer.investor-bond-buyer': ApiInvestorBondBuyerInvestorBondBuyer;
      'api::national-manager.national-manager': ApiNationalManagerNationalManager;
      'api::participating-countries-partner.participating-countries-partner': ApiParticipatingCountriesPartnerParticipatingCountriesPartner;
      'api::participating-country.participating-country': ApiParticipatingCountryParticipatingCountry;
      'api::partner.partner': ApiPartnerPartner;
      'api::payment-detail.payment-detail': ApiPaymentDetailPaymentDetail;
      'api::trust-fund-a-board-manage.trust-fund-a-board-manage': ApiTrustFundABoardManageTrustFundABoardManage;
      'api::trust-fund-country.trust-fund-country': ApiTrustFundCountryTrustFundCountry;
      'api::user-detail.user-detail': ApiUserDetailUserDetail;
      'api::visa.visa': ApiVisaVisa;
      'api::visa-holder.visa-holder': ApiVisaHolderVisaHolder;
    }
  }
}
