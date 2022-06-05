kill $(lsof -t -i:3000) || true
kill $(lsof -t -i:5000) || true
echo 'ports 5000 and 3000 stopped'
