package pos

import (
	"context"
	"coolcar/car/mq/amqpclt"
	coolenvpb "coolcar/shared/coolenv"
	"encoding/json"

	"go.uber.org/zap"
)

// Subscriber implements a position subscriber.
type Subscriber struct {
	Sub    *amqpclt.Subscriber
	Logger *zap.Logger
}

// Subscribe subscribes position updates.
func (s *Subscriber) Subscribe(c context.Context) (ch chan *coolenvpb.CarPosUpdate, cleanUp func(), err error) {
	msgCh, cleanUp, err := s.Sub.SubscribeRaw(c)
	if err != nil {
		return nil, cleanUp, err
	}

	posCh := make(chan *coolenvpb.CarPosUpdate)
	go func() {
		for msg := range msgCh {
			var pos coolenvpb.CarPosUpdate
			err := json.Unmarshal(msg.Body, &pos)
			if err != nil {
				s.Logger.Error("cannot unmarshal", zap.Error(err))
			}
			posCh <- &pos
		}
		close(posCh)
	}()
	return posCh, cleanUp, nil
}
