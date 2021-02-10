package main

import (
	"fmt"
	"time"

	"github.com/streadway/amqp"
)

const exchange = "go_ex"

func main() {
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	if err != nil {
		panic(err)
	}

	ch, err := conn.Channel()
	if err != nil {
		panic(err)
	}

	err = ch.ExchangeDeclare(
		exchange,
		"fanout",
		true,  // durable
		false, // autoDelete
		false, // internal
		false, // noWait
		nil,   // args
	)
	if err != nil {
		panic(err)
	}

	go subscribe(conn, exchange)
	go subscribe(conn, exchange)

	i := 0
	for {
		i++
		err := ch.Publish(
			exchange,
			"",    // key
			false, // mandatory
			false, // immediate
			amqp.Publishing{
				Body: []byte(fmt.Sprintf("message %d", i)),
			},
		)
		if err != nil {
			fmt.Println(err.Error())
		}
		time.Sleep(200 * time.Millisecond)
	}
}

func subscribe(conn *amqp.Connection, ex string) {
	ch, err := conn.Channel()
	if err != nil {
		panic(err)
	}
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"",    // name
		false, // durable
		true,  // autoDelete
		false, // exlusive
		false, // noWait
		nil,   // args
	)
	if err != nil {
		panic(err)
	}
	defer ch.QueueDelete(
		q.Name,
		false, // ifUnused
		false, // ifEmpty
		false, // noWait
	)

	err = ch.QueueBind(
		q.Name,
		"", // key
		ex,
		false, // noWait
		nil,   // args
	)
	if err != nil {
		panic(err)
	}

	consume("c", ch, q.Name)
}

func consume(consumer string, ch *amqp.Channel, q string) {
	msgs, err := ch.Consume(
		q,
		consumer, // consumer
		true,     // autoAck
		false,    // exclusive
		false,    // noLocal
		false,    // noWait
		nil,      // args
	)
	if err != nil {
		panic(err)
	}

	for msg := range msgs {
		fmt.Printf("%s: %s\n", consumer, msg.Body)
	}
}
