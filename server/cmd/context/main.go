package main

import (
	"context"
	"fmt"
	"time"
)

type paramKey struct{}

func main() {
	c := context.WithValue(context.Background(),
		paramKey{}, "abc")
	c, cancel := context.WithTimeout(c, 10*time.Second)
	defer cancel()
	go mainTask(c)

	var cmd string
	for {
		fmt.Scan(&cmd)
		if cmd == "c" {
			cancel()
		}
	}
}

func mainTask(c context.Context) {
	fmt.Printf("main task started with param %q\n", c.Value(paramKey{}))
	go func() {
		c1, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		smallTask(c1, "background_task", 9*time.Second)
	}()
	go func() {
		c1, cancel := context.WithTimeout(c, 10*time.Second)
		defer cancel()
		smallTask(c1, "sub_task", 9*time.Second)
	}()
	smallTask(c, "same_task", 8*time.Second)
}

func smallTask(c context.Context, name string, d time.Duration) {
	fmt.Printf("%s started with param %q\n", name, c.Value(paramKey{}))
	select {
	case <-time.After(d):
		fmt.Printf("%s done\n", name)
	case <-c.Done():
		fmt.Printf("%s cancelled\n", name)
	}
}
