
docker:
	@docker run -itd --rm --privileged \
    --pull always \
    -v ~/redroid-data:/data \
    -p 5555:5555 \
    --name="redroid" \
    redroid/redroid:12.0.0_64only-latest
connect:
	@adb connect localhost:5555

run:
	@scrcpy --verbosity=debug -s localhost:5555
install:
	@adb -s localhost:5555 install  $(apk)