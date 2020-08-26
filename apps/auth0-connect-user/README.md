# Auth0 connect user rule

> Connects user's auth0 profile to a CMS user based on invitationCode

See [Auth0 docs](../../docs/config/auth0) for how this script is supposed to be used.

Note: We can only use a single index file and only deps that are supported in the Auth0 user profile script execution environment here. If we want to go beyond that, we'll need a bundle step for this script.