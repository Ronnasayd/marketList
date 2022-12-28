# see for installation and usage https://github.com/remote-android/redroid-doc

## running redroid
docker run -itd --rm --privileged \
    --pull always \
    -v ~/data:/data \
    -p 5555:5555 \
    redroid/redroid:11.0.0-latest

### Explanation:
###   --pull always    -- use latest image
###   -v ~/data:/data  -- mount data partition
###   -p 5555:5555     -- expose adb port


## install adb https://developer.android.com/studio#downloads
adb connect localhost:5555
### NOTE: change localhost to IP if running redroid remotely

## install expo
# adb install Expo_2.26.6_Apkpure.apk

## view redroid screen
## install scrcpy https://github.com/Genymobile/scrcpy/blob/master/README.md#get-the-app
scrcpy -s localhost:5555
### NOTE: change localhost to IP if running redroid remotely
###     typically running scrcpy on your local PC