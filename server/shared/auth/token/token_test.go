package token

import (
	"testing"
	"time"

	"github.com/dgrijalva/jwt-go"
)

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlyK+cR8u27fuMn60btT+
Xy1Rxd4yitBzcMPkD/Y6FonFDBFvEkXaPx+zcQy1jdaBllnuJ7Ff7xwNIby7FOFc
UZN4tDiU8lUsoZjS3cR/OEW+qPnVHrIYa+sGpVwP2VdBEbpb7SHEbvT9hHOTtEwU
Zkj35Unoj5Lwa4WFA8asEpmxDs2G3C87HnhRtdwRWUNIJ7YTAIOMt4VQ1GaQCqaL
niuJ/h6VWSqipqGMRFhXBWzIlNlcVIBXyjgvlALtFCTC2z+H1cDRRzAff4WhUefx
laKPprVOgHnlXhQl66X+antHnW7GQ/TFTzFdUUoUzwpYbikK+5Gz3VMXYt+4tFYt
BQIDAQAB
-----END PUBLIC KEY-----`

func TestVerify(t *testing.T) {
	pubKey, err := jwt.ParseRSAPublicKeyFromPEM([]byte(publicKey))
	if err != nil {
		t.Fatalf("cannot parse public key: %v", err)
	}

	v := &JWTTokenVerifier{
		PublicKey: pubKey,
	}

	cases := []struct {
		name    string
		tkn     string
		now     time.Time
		want    string
		wantErr bool
	}{
		{
			name: "valid_token",
			tkn:  "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyNDYyMjIsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiY29vbGNhci9hdXRoIiwic3ViIjoiNWY3YzMxNjhlMjI4M2FhNzIyZTM1MWEzIn0.jPVRIZXsNz08OCudP4cC8KGzVEIWC42TOMHpc6cN-_3yUgbPcrhuJL6C27fzoxt0j8J3L0z6nv0ni_713fzYjo1Y_b4Axxz4sI5bz-b9O1BziFU1NC9t3IJbwFsF2Svz2OpG3aY388rTZ4orHShfRbrzGnzK8NbNXIZ7CcCvEznHiJEmSgqSZSYeZVjjid2p2l_T_eTQxJTkHi9LE-3g_AfLKLXXmqLlXYpurTGMWEBkJq51uNs6MnESi4pEwbLviTmZTTtC6qAhkVmeJh7QUZA8BPKoxSbNEYQxYYQK1aiRGyrrONsK1etXW6JG2F4x0wiNjTKMvQSAsq7GnWvkoQ",
			now:  time.Unix(1516239122, 0),
			want: "5f7c3168e2283aa722e351a3",
		},
		{
			name:    "token_expired",
			tkn:     "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyNDYyMjIsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiY29vbGNhci9hdXRoIiwic3ViIjoiNWY3YzMxNjhlMjI4M2FhNzIyZTM1MWEzIn0.jPVRIZXsNz08OCudP4cC8KGzVEIWC42TOMHpc6cN-_3yUgbPcrhuJL6C27fzoxt0j8J3L0z6nv0ni_713fzYjo1Y_b4Axxz4sI5bz-b9O1BziFU1NC9t3IJbwFsF2Svz2OpG3aY388rTZ4orHShfRbrzGnzK8NbNXIZ7CcCvEznHiJEmSgqSZSYeZVjjid2p2l_T_eTQxJTkHi9LE-3g_AfLKLXXmqLlXYpurTGMWEBkJq51uNs6MnESi4pEwbLviTmZTTtC6qAhkVmeJh7QUZA8BPKoxSbNEYQxYYQK1aiRGyrrONsK1etXW6JG2F4x0wiNjTKMvQSAsq7GnWvkoQ",
			now:     time.Unix(1517239122, 0),
			wantErr: true,
		},
		{
			name:    "bad_token",
			tkn:     "bad_token",
			now:     time.Unix(1517239122, 0),
			wantErr: true,
		},
		{
			name:    "wrong_signature",
			tkn:     "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyNDYyMjIsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiY29vbGNhci9hdXRoIiwic3ViIjoiNWY3YzMxNjhlMjI4M2FhNzIyZTM1MWE0In0.jPVRIZXsNz08OCudP4cC8KGzVEIWC42TOMHpc6cN-_3yUgbPcrhuJL6C27fzoxt0j8J3L0z6nv0ni_713fzYjo1Y_b4Axxz4sI5bz-b9O1BziFU1NC9t3IJbwFsF2Svz2OpG3aY388rTZ4orHShfRbrzGnzK8NbNXIZ7CcCvEznHiJEmSgqSZSYeZVjjid2p2l_T_eTQxJTkHi9LE-3g_AfLKLXXmqLlXYpurTGMWEBkJq51uNs6MnESi4pEwbLviTmZTTtC6qAhkVmeJh7QUZA8BPKoxSbNEYQxYYQK1aiRGyrrONsK1etXW6JG2F4x0wiNjTKMvQSAsq7GnWvkoQ",
			now:     time.Unix(1516239122, 0),
			wantErr: true,
		},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			jwt.TimeFunc = func() time.Time {
				return c.now
			}
			accountID, err := v.Verify(c.tkn)

			if !c.wantErr && err != nil {
				t.Errorf("verification failed: %v", err)
			}

			if c.wantErr && err == nil {
				t.Errorf("want error; got no error")
			}

			if accountID != c.want {
				t.Errorf("wrong account id. want: %q, got: %q", c.want, accountID)
			}
		})
	}
}
