# Tut's Weh

This repository contains the code for the *Tut's Weh* application, an app that allows children to keep track of pain levels and show their entries to their doctor. This project came into being as pro bono help for a matura project of a student, Valentina Trevissoi, who asked me to implement the app as part of her matura project. Art and pictures are created by her hand. The app is available on the [App Store](https://apps.apple.com/ch/app/tuts-weh/id6476036636?l=en-GB) and the [Google Play Store](https://play.google.com/store/apps/details?id=com.jasperdekoninck.PainScales).

The app was created using npx expo.

## Installation
For development, you can install and run the app locally.
First install [NVM](https://github.com/nvm-sh/nvm):
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```
Then install nodejs and npm:
```bash
nvm install 20
```
We can then install the application:
```bash
cd PainScales
npm install -g expo-cli
npm install
```

You can then run a server by running:
```bash
npx expo start
```
You can then scan the QR code using the [Expo Go app](https://expo.dev/client) on your phone and try out the app there. For further information about development, I refer to the [documentation](https://docs.expo.dev/).
