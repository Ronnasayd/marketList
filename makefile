docker:
	@docker run -itd --rm --privileged \
    --pull always \
    -v ~/data:/data \
    -p 5555:5555 \
    redroid/redroid:11.0.0-latest
connect:
	@adb connect localhost:5555

run:
	@scrcpy -s localhost:5555