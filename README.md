# Burton Sonos F-Droid repository

Hosted catalog for [Droidify](https://github.com/Droid-ify/client) and the official F-Droid client. The Android app lives in [Burton-Workspaces/burton-sonos-android](https://github.com/Burton-Workspaces/burton-sonos-android).

This repository is **GitHub Pages only**. It must not contain `config.yml`, `keystore.jks`, or the app signing key. Those stay on the machine that runs `fdroid init` / `./scripts/publish-fdroid-pages.sh`.

## Add in Droidify or F-Droid

- **Address:** https://burton-workspaces.github.io/burton-sonos-fdroid/fdroid/repo
- **Fingerprint:** see [FINGERPRINT](FINGERPRINT) (filled in on the first publish)

Or open:

```
https://burton-workspaces.github.io/burton-sonos-fdroid/fdroid/repo?fingerprint=<contents of FINGERPRINT>
```

APKs also remain on [GitHub Releases](https://github.com/Burton-Workspaces/burton-sonos-android/releases) of the app repo.

## Maintainers

From a checkout of `burton-sonos-android` sitting next to this clone:

```bash
export FDROID_ROOT=~/fdroid
./scripts/publish-fdroid-pages.sh 1.3.0
```

`FDROID_PAGES_DIR` defaults to `../burton-sonos-fdroid`. Setup and key handling: [docs/fdroid.md](https://github.com/Burton-Workspaces/burton-sonos-android/blob/master/docs/fdroid.md).
