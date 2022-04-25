# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
