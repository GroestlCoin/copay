

# Groestlpay Backup and Restore Notes

## Description

Groestlpay is a Multisig HD Wallet. Groestlpay app holds the extended private keys for the wallet. The private key never leaves the device, so for accessing a wallet funds it is necesary to have the device or a backup of the wallet.

## Definitions

### Backup Formats:
 * Wallet Seed (WS): 12 words mnemonic backup. The 12 words are used as wallet seed, following BIP39 specification. The wallet seed may require a passphrase to recreate the wallet (if one was specified at creation time).
 * Wallet Backup (WB): Exported data from Groestlpay, containing an AES encrypted JSON with many wallet parameters (like extended private key, wallet name, extended public keys of groestlpayers , etc. See #export-format). This data can be created from (Settings -> Export) and it was the default backup format on previous Groestlpay versions. WB can be a file (standard format for Groestlpay desktop versions) or a text (standard for Groestlpay mobile versions).

### Backup recovery cases
 * Case 1: Lost of device holding the wallet
 * Case 2: Change to a new Groestlcore Wallet Service (GWS)
 * Case 3: Lost device + new Groestlcore Wallet Service

### Wallet Recovery Scope
* Basic Recovery: Wallet access is restored. It is possible to see wallet balance and past transactions. It is possible to send and receive payments.
 * Full Recovery: All the features of Partial Recovery + wallet name, groestlpayer names are recovered, past payment proposal metadata (who signed, and notes) are recoved.

## Wallet Restore Scenarios

### Non-multisig wallets

  Case 1: From both WS and WB, full recovery is possible.
    - Enter the WS or the WB at 'Import wallet' in a new device.
    - Wallet access should be restored.

  Case 2: Basic recovery is possible using the device where the wallet is installed, pointing to the new server (Recreate wallet feature).
    - Point to the new server (Settings -> Groestlcore Wallet Service).
    - If the wallet is not registered at the new Wallet service, a 'Recreate' button will appear at wallet's home. Click it to recreate the wallet.
    - Wallet should be recreated and access to funds should be restored.
    - If the wallet existed, it may be necessary to rescan Wallet's addresses for funds (from Settings -> Advanced -> Scan Addresses for Funds)

  Case 3: From both Backup Words and Backup file, basic recovery is possible.
    (Using WS)
    - Enter the WS at 'Import Wallet'
      If the error "This wallet is not registered at the wallet service" appears:
      - Go to 'Create Wallet', and enter the WS at 'Advanced Options'. Select a new name for the restored wallet. Total and required number of groestlpayers should be set to 1.
      - Wallet should be recreated and access to funds should be restored.

    (Using WD)
    - Enter the WD at 'Import Wallet'
    - Wallet should be recreated and access to funds should be restored.


### Multisig wallets

  Case 1: From both WS and WD, full recovery is possible.
    - Enter WS or WD at 'Import wallet' in a new device.
    - Wallet access should be restored.

  Case 2: Basic recovery is possible using the device where the wallet is installed, pointing the the new server (Recreate Wallet feature).
    - Point to the new server (Settings -> Groestlcore Wallet Service).
    - If the wallet is not registered at the new Wallet service, a 'Recreate' button will appear at wallet's home. Click it to recreate the wallet.
    - Wallet should be recreated and access to funds should be restored.
    - If the wallet existed, it may be necessary to rescan Wallet's addresses for funds (from Settings -> Advanced -> Scan Addresses for Funds)

  Case 3: Basic recovery is possible using:

    A) WS of all groestlpayers in the wallet
      - Enter one WS at Create (at the Advanced option section). Note that the wallet configuration (M-of-N and network paramenters) needs to match the parameters that where entered when the wallet was first created. Wallet name and groestlpayer nicknames need to be entered also, but there is no need for them to match the original wallet setup.
      - Ask other groestlpayers to join the wallet using the given invitation code. All groestlpayers need to enter their WS at Join (at -> Advanced Options -> Wallet Seed).
      - Wallet should be recreated and access to funds should be restored.

    B) One WD and a quorum of WS of the other members.
      - Using the WD, import the wallet.
      - Ask other groestlpayers to import the wallet using their WS.
      - Wallet should be recreated and funds should be accesable

      In this case, groestlpayers will not be able to decrypt the 'notes' field on the new Spend Proposals, because the shared secret stored at the WD is not longer known by other groestlpayers .
