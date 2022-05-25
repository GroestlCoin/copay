GroestlPay is an easy-to-use, open-source, multiplatform, multisignature, secure groestlcoin wallet platform for both individuals and companies.  GroestlPay uses [Groestlcore Wallet Service](https://github.com/Groestlcoin/bitcore-wallet-service) (GWS) for peer synchronization and network interfacing.

For a list of frequently asked questions please visit the [GroestlPay FAQ](https://github.com/bitpay/copay/wiki/COPAY---FAQ).

## Main Features

- Multiple wallet creation and management in-app
- Intuitive, multisignature security for personal or shared wallets
- Easy spending proposal flow for shared wallets and group payments
- [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) Hierarchical deterministic (HD) address generation and wallet backups
- Device-based security: all private keys are stored locally, not in the cloud
- Support for Groestlcoin testnet wallets
- Synchronous access across all major mobile and desktop platforms
- Payment protocol (BIP70-BIP73) support: easily-identifiable payment requests and verifiable, secure groestlcoin payments
- Support for over 150 currency pricing options and unit denomination in GRS or groestls
- Mnemonic (BIP39) support for wallet backups
- Paper wallet sweep support (BIP38)
- Hardware wallet support (Trezor and Ledger) (only in Chrome App version)
- Email notifications for payments and transfers
- Push notifications (only available for ios and android versions)
- Customizable wallet naming and background colors
- Multiple languages supported

## Install For Development

Clone the repo and open the directory:

```sh
git clone https://github.com/Groestlcoinofficial/GroestlPay
cd GroestlPay
```

Ensure you have [Node](https://nodejs.org/) installed, then install and start GroestlPay:

```sh
npm install
npm start
```

Visit [`localhost:3000`](http://localhost:3000/) to view the app.

> **Note:** This method should only be used for development purposes. When running GroestlPay in a normal browser environment, browser extensions and other malicious code might have access to internal data and private keys.

## Build GroestlPay App Bundles

### Android

- Install Android SDK
- Run `make android`

### iOS

- Install Xcode 6.1 (or newer)
- Run `make ios-prod`

##### Notes for Xcode 7.0

###### ATS support

Before starting GroestlPay from Xcode, add these lines to "Custom iOS Target Properties":

```
<key>NSAppTransportSecurity</key>
 <dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
 </dict>
```

![Example](http://i.stack.imgur.com/nGw3j.png)


App Transport Security (ATS) enforces best practices in the secure connections between an app and its back end. [Read complete documentation](https://developer.apple.com/library/prerelease/ios/releasenotes/General/WhatsNewIniOS/Articles/iOS9.html).

###### Invalid Bundle while submitting application

`iPad Multitasking support requires launch story board in bundle`

To fix this problem, add the following:

```
<key>UIRequiresFullScreen</key>
<string>YES</string>
```
###### Build settings, headers search path

Add this line to your Build Settings -> Header Search Paths -> Release

"$(OBJROOT)/UninstalledProducts/$(PLATFORM_NAME)/include"



### Windows Phone

- Install Visual Studio 2013 (or newer)
- Run `make wp8-prod`

### Desktop versions (Windows, OS X, Linux)

GroestlPay uses NW.js (also know as node-webkit) for its desktop version. NW.js is an app runtime based on `Chromium` and `node.js`.

- Install NW.js on your system from [nwjs.io](http://nwjs.io/)
- Run `grunt desktop`

### Google Chrome App

- Run `npm run-script chrome`

On success, the Chrome extension will be located at: `browser-extensions/chrome/GroestlPay-chrome-extension`.  To install it go to `chrome://extensions/` in your browser and ensure you have the 'developer mode' option enabled in the settings.  Then click on "Load unpacked chrome extension" and choose the directory mentioned above.

### Firefox Add-on

The GroestlPay Firefox Extension has been deprecated and is no longer supported.

## About GroestlPay

### General

GroestlPay implements a multisig wallet using [p2sh](https://en.bitcoin.it/wiki/Pay_to_script_hash) addresses.  It supports multiple wallets, each with its own configuration, such as 3-of-5 (3 required signatures from 5 participant peers) or 2-of-3.  To create a multisig wallet shared between multiple participants, GroestlPay requires the extended public keys of all the wallet participants.  Those public keys are then incorporated into the wallet configuration and combined to generate a payment address where funds can be sent into the wallet.  Conversely, each participant manages their own private key and that private key is never transmitted anywhere.

To unlock a payment and spend the wallet's funds, a quorum of participant signatures must be collected and assembled in the transaction.  The funds cannot be spent without at least the minimum number of signatures required by the wallet configuration (2-of-3, 3-of-5, 6-of-6, etc.).  Once a transaction proposal is created, the proposal is distributed among the wallet participants for each to sign the transaction locally.  Finally, when the transaction is signed, the last signing participant will broadcast the transaction to the Groestlcoin network.

GroestlPay also implements [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) to generate new addresses for peers.  The public key that each participant contributes to the wallet is a BIP32 extended public key.  As additional public keys are needed for wallet operations (to produce new addresses to receive payments into the wallet, for example) new public keys can be derived from the participants' original extended public keys.  Once again, it's important to stress that each participant keeps their own private keys locally - private keys are not shared - and are used to sign transaction proposals to make payments from the shared wallet.

For more information regarding how addresses are generated using this procedure, see: [Structure for Deterministic P2SH Multisignature Wallets](https://github.com/bitcoin/bips/blob/master/bip-0045.mediawiki).

## GroestlPay Backups and Recovery

Since v1.2 GroestlPay uses BIP39 mnemonics for backing up wallets.  The BIP44 standard is used for wallet address derivation. Multisig wallets use P2SH addresses, while non-multisig wallets use P2PKH.

Information about backup and recovery procedures is available at: https://github.com/Groestlcoinofficial/GroestlPay/blob/master/backupRecovery.md

Previous versions of GroestlPay used files as backups. See the following section.

It is possible to recover funds from a GroestlPay Wallet without using GroestlPay or the Wallet Service.


## Wallet Export Format

GroestlPay encrypts the backup with the [Stanford JS Crypto Library](http://bitwiseshiftleft.github.io/sjcl/).  To extract the private key of your wallet you can use https://bitwiseshiftleft.github.io/sjcl/demo/, copy the backup to 'ciphertext' and enter your password.  The resulting JSON will have a key named: `xPrivKey`, that is the extended private key of your wallet.  That information is enough to sign any transaction from your wallet, so be careful when handling it!

The backup also contains the key `publicKeyRing` that holds the extended public keys of the payers.
Depending on the key `derivationStrategy`, addresses are derived using
[BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) or [BIP45](https://github.com/bitcoin/bips/blob/master/bip-0045.mediawiki). Wallets created in GroestlPay v1.2 and forward always use BIP44, all previous wallets use BIP45. Also note that since GroestlPay version v1.2, non-multisig wallets use address types Pay-to-PublicKeyHash (P2PKH) while multisig wallets still use Pay-to-ScriptHash (P2SH) (key `addressType` at the backup):

| GroestlPay Version  | Wallet Type   | Derivation Strategy   | Address Type  |
|---|---|---|---|---|
|  <1.2  | All  |  BIP45 | P2SH   |
|  >=1.2 | Non-multisig  | BIP44  | P2PKH   |
| >=1.2  | Multisig  |  BIP44 |  P2SH   |
| >=1.5  | Multisig Hardware wallets  |  BIP44 (root m/48') |  P2SH   |

BIP45 note: All addresses generated at BWS with BIP45 use the 'shared cosigner index' (2147483647) so GroestlPay address indexes look like: `m/45'/2147483647/0/x` for main addresses and `m/45'/2147483647/1/y` for change addresses.

Since version 1.5, GroestlPay uses the root `m/48'` for hardware multisignature wallets. This was coordinated with Ledger and Trezor teams. While the derivation path format is still similar to BIP44, the root was in order to indicate that these wallets are not discoverable by scanning addresses for funds. Address generation for multisignature wallets requires the other payers extended public keys.


## Groestlcore Wallet Service

GroestlPay depends on [Groestlcore Wallet Service](https://github.com/Groestlcoin/bitcore-wallet-service) (GWS) for blockchain information, networking and payer synchronization.  A GWS instance can be setup and operational within minutes or you can use a public instance like `https://gws.groestlcoin.org`.  Switching between GWS instances is very simple and can be done with a click from within GroestlPay. GWS also allows GroestlPay to interoperate with other wallets like [Groestlcore Wallet CLI] (https://github.com/Groestlcoin/bitcore-wallet-service).

## Translations
GroestlPay uses standard gettext PO files for translations and [Crowdin](https://crowdin.com/project/copay) as the front-end tool for translators.  To join our team of translators, please create an account at [Crowdin](https://crowdin.com) and translate the GroestlPay documentation and application text into your native language.

To download and build using the latest translations from Crowdin, please use the following commands:

```sh
cd i18n
node crowdin_download.js
```

This will download all partial and complete language translations while also cleaning out any untranslated ones.

**Translation Credits:**
- Japanese: @dabura667
- French: @kirvx
- Portuguese: @pmichelazzo
- Spanish: @cmgustavo
- German: @saschad
- Russian: @vadim0

*Gracias totales!*

## Release Schedules
GroestlPay uses the `MAJOR.MINOR.BATCH` convention for versioning.  Any release that adds features should modify the MINOR or MAJOR number.

### Bug Fixing Releases

We release bug fixes as soon as possible for all platforms.  Usually around a week after patches, a new release is made with language translation updates (like 1.1.4 and then 1.1.5).  There is no coordination so all platforms are updated at the same time.

### Minor and Major Releases
- t+0: tag the release 1.2 and "text lock" (meaning only non-text related bug fixes. Though this rule is sometimes broken, it's good to make a rule.)
- t+7: testing for 1.2 is finished, translation is also finished, and 1.2.1 is tagged with all translations along with bug fixes made in the last week.
- t+7: iOS is submitted for 1.2.1. All other platforms are submitted with auto-release off.
- t + (~17): All platforms 1.2.1 are released when Apple approves the iOS application update.


## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)

## Support

 Please see [Support requests](CONTRIBUTING.md#support)


## License

GroestlPay is released under the MIT License.  Please refer to the [LICENSE](https://github.com/Groestlcoinofficial/GroestlPay/blob/master/LICENSE) file that accompanies this project for more information including complete terms and conditions.
