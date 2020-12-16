# 消息机制 taro event

<https://taro-docs.jd.com/taro/docs/apis/about/events>

// 监听一个事件，接受参数
events.on('eventName', (arg) => {
// doSth
})

// 监听同个事件，同时绑定多个 handler
events.on('eventName', handler1)
events.on('eventName', handler2)
events.on('eventName', handler3)

// 触发一个事件，传参
events.trigger('eventName', arg)

// 触发事件，传入多个参数
events.trigger('eventName', arg1, arg2, ...)

// 取消监听一个事件
events.off('eventName')

// 取消监听一个事件某个 handler
events.off('eventName', handler1)

// 取消监听所有事件
events.off()

Taro.eventCenter.on
Taro.eventCenter.trigger
Taro.eventCenter.off
