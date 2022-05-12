# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.0.2](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/compare/v3.0.1...v3.0.2) (2022-05-12)


### Bug Fixes

* **routes:** fix get user own account ([832faa7](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/commit/832faa74206ff10803c0669f4e90239ed122459f))

### [3.0.1](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/compare/v3.0.0...v3.0.1) (2022-05-12)


### Bug Fixes

* **app:** change mysql to mysql2 ([4e062a3](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/commit/4e062a32fe1ef83e3925b7d189bb174f9f6070af))

## [3.0.0](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/compare/v2.6.2...v3.0.0) (2022-05-05)


### ⚠ BREAKING CHANGES

* **app:** error response become an object

### Features

* **app:** change error response ([51ea628](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/commit/51ea6288b2c5a850816bffb05b37965d4db18057))


### Bug Fixes

* **controller:** delete status in response when user sign in ([624dfd8](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/commit/624dfd8806257fe170fc69a4bf631d06d057ed42))

### [2.6.2](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/compare/v2.6.1...v2.6.2) (2022-05-05)

### [2.6.1](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/compare/v2.6.0...v2.6.1) (2022-05-04)


### Bug Fixes

* **tests:** fix - add end tests ([82d5e8a](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/commit/82d5e8a291688a975ee43ddbd4b7c7bd65572e26))

## [2.6.0](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/compare/v2.5.6...v2.6.0) (2022-05-02)


### Features

* **routes:** add find own account route ([8f2bbb6](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/commit/8f2bbb6826e608f1fb7dd474c9e2275ab0566ddc))

### [2.5.6](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/compare/v2.5.5...v2.5.6) (2022-05-02)

### [2.5.5](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/compare/v2.5.4...v2.5.5) (2022-05-02)

### [2.5.4](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/compare/v2.5.3...v2.5.4) (2022-05-01)

### [2.5.3](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/compare/v2.5.2...v2.5.3) (2022-05-01)

### [2.5.2](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/compare/v2.5.1...v2.5.2) (2022-05-01)

### [2.5.1](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/compare/v2.5.0...v2.5.1) (2022-05-01)

## [2.5.0](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/compare/v2.4.0...v2.5.0) (2022-05-01)


### Features

* **app:** allow multiple cors origin ([b20538a](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/commit/b20538a9a9acb3129f30b9559217710061d310ac))
* **app:** remove status and statusCode in response to client ([887561f](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/commit/887561f9153a59d6335c6321e80bddcfc950e83d))
* **routes:** add find all user posts as Admin ([feaafea](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/commit/feaafea93b3af2d0e8a69c43a4243282206506d8))


### Bug Fixes

* **app:** custom error rateLimit ([78742df](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/commit/78742dfe63b1503fb23cd76bdb766a39cc8af188))
* **controller:** add user informations in response when user sign in ([5dfb0ad](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/commit/5dfb0ada28f764d2f4002d18d75a6ce3db9a1df6))
* **controller:** custom error message when creating comment ([337355c](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/commit/337355c9a2b1a79e3f5f0c6995c226d8fcb05550))
* **controller:** error statusCode fix ([fb07370](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/commit/fb073700bdec3ddb8686cdefaa625ea557c411d1))
* **model:** sanitize user model when returning to client, remove passwordHash and passwordSalt ([a3c06b7](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/commit/a3c06b7bf8dc33144ce53bc1df7287f393cc96ad))
* **services:** add related author and post when fetch comment ([5a5d20e](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/commit/5a5d20e67e59b62a81021cc1c046c02a2009a952))
* **services:** add related author when returning all post comments ([1965ef5](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/commit/1965ef53e6444ef79aa3ea1021860c7d7308a51b))

## [2.4.0](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/compare/v2.3.0...v2.4.0) (2022-04-25)


### Features

* **routes:** add update user account status by admin only ([5395962](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/5395962c7c038274741082a16430a9a9fafda27b))
* **services:** add check user is active when sign in ([3820746](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/38207467bd32e0e80dba15b8e8e4601ef32e4830))


### Bug Fixes

* **build:** change WEBAPP_ORIGIN to WEB_APP_ORIGIN in .env file ([8c266bf](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/8c266bfa60255ca8d2989dad0edce9a67f25cb4e))
* **config:** delete database password required option in config ([e24ec53](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/e24ec533146a83ecf75c798c896a230bc18fa0c1))
* **controller:** add controll email and password exist ([242dc95](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/242dc95045c101738f4e5369c22808a477919817))
* **controller:** add with graph fetch author ([5a438b1](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/5a438b16b6517d1f4a9602a6794da4fd3ca45fc1))
* **controller:** change sign in User response, remove user informations ([aba79b3](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/aba79b3e18277fbf928686ac97c04573024d6dfd))
* **controller:** fix - never update authorId for post ([ad3c2f5](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/ad3c2f5e18b6b923e7f9807397e13281117a5d7e))

## [2.3.0](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/compare/v2.2.0...v2.3.0) (2022-04-12)


### Features

* **services:** add check user role for crud comment ([e1aabfc](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/e1aabfcdc674017f4db662837ed6d468b1e7c095))


### Bug Fixes

* **controller:** fix posts authorId, change to define it to current user id ([fb053de](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/fb053de39fa76f6802fee90bc3e37a6596a06caa))

## [2.2.0](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/compare/v2.1.0...v2.2.0) (2022-04-11)


### Features

* **routes:** add find all public posts without authentication ([59eb613](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/59eb6131084e45e724630db9e11e16c10619597b))

## [2.1.0](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/compare/v2.0.1...v2.1.0) (2022-04-11)


### Features

* **services:** add check user role for crud post ([af15d7d](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/af15d7d9452afd32a1ec017376eb49de6a22cf42))

### [2.0.1](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/compare/v2.0.0...v2.0.1) (2022-04-11)


### Bug Fixes

* **services:** add check acces to ressource with user role and user id && check session payload id ([a548db2](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/a548db229b0f04ea87ca1265ca79e5a592ce9dcb))

## [2.0.0](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/compare/v1.1.0...v2.0.0) (2022-04-11)


### ⚠ BREAKING CHANGES

* **app:** role become a string for user

### Features

* **app:** delete user role relation ([164fe16](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/164fe168e0713b05ecffa294c469e8ff3225d1c5))

## [1.1.0](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/compare/v1.0.3-0...v1.1.0) (2022-04-10)


### Features

* **middleware:** add auth middleware and install jsonwebtoken ([c94a673](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/c94a673286d8cf0838c8631b90a08309a5393e9b))
* **middleware:** configure middleware auth and protected routes && add updatePassword route ([0d5deee](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/0d5deee0ab4978b2343dc1fa975925ed5c73f882))


### Bug Fixes

* **middleware:** change response status for auth fail ([a3cf28d](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/commit/a3cf28d189c1fba38f28de6b14d8f09148857eea))

## [1.0.3-API without middleware.0](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/compare/v1.0.3-0...v1.0.3-API without middleware.0) (2022-04-07)

### [1.0.3-0](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/compare/v1.0.2...v1.0.3-0) (2022-04-07)

### [1.0.2](https://github.com/lazarefortune/SupDeVinci_Projet_Blog_Backend/compare/v2.0.0...v1.0.2) (2022-04-07)

### 1.0.1 (2022-03-15)
