protoc -I=. --go_out=plugins=grpc,paths=source_relative:gen/go trip.proto
protoc -I=. --grpc-gateway_out=paths=source_relative,grpc_api_configuration=trip.yaml:gen/go trip.proto

PBTS_BIN_DIR=../../wx/miniprogram/node_modules/.bin
PBTS_OUT_DIR=../../wx/miniprogram/service/proto_gen
$PBTS_BIN_DIR/pbjs -t static -w es6 trip.proto --no-create --no-encode --no-decode --no-verify --no-delimited -o $PBTS_OUT_DIR/trip_pb_tmp.js
echo 'import * as $protobuf from "protobufjs";\n' > $PBTS_OUT_DIR/trip_pb.js
cat $PBTS_OUT_DIR/trip_pb_tmp.js >> $PBTS_OUT_DIR/trip_pb.js
rm $PBTS_OUT_DIR/trip_pb_tmp.js
$PBTS_BIN_DIR/pbts -o $PBTS_OUT_DIR/trip_pb.d.ts $PBTS_OUT_DIR/trip_pb.js
