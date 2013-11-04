#!/bin/bash
APP=""
worker_name=$APP
BASE_DIR="$PWD"
CUR_DIR=${BASE_DIR}/${APP}


check_app ()
{
PORT=`grep port ${CUR_DIR}/configuration/staging.json |head -1|awk '{print $2}'|sed 's/,$//'`
echo "Testing - http://localhost:${PORT}/ping ..."
curl http://localhost:${PORT}/ping
 if [ $? -ne "0" ]
  then
    return 1
 fi
}

deploy ()
{
    check_app
    if [ $? -ne "0" ]
    then
       echo "${APP} is down , starting..."
       cd ${CUR_DIR}
       npm start
    fi

    echo "Deploying ${APP}....${PWD}..${whoami}"
    PREV_WORKING_REVISION="$(cat ${CUR_DIR}/run/.RUNNING_REVISION || echo "")"
    echo "Prev Revision ${PREV_WORKING_REVISION}"
    NEXT_WORKING_REVISION=`git rev-parse HEAD`
    echo "Next Revision ${NEXT_WORKING_REVISION}"
    npm install
    npm run-script deploy
    rc=$?
    if [ $rc -eq "0" ]
    then
      echo `git rev-parse HEAD` > ${CUR_DIR}/run/.RUNNING_REVISION
      check_app
    else
      exit $rc
    fi
}


### MAIN
deploy
