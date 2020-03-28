#!/bin/bash
echo "Attaching environment..."
export PATH=$PATH:/usr/local/bin
export NODE_PATH=/usr/local/share/node
source ~/.nvm/nvm.sh
echo "Restarting PM2..."
/bin/bash -l -c "pm2 restart index"
