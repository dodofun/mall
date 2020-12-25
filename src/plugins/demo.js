export default (ctx, options) => {
  console.log('options', options)
  // plugin 主体
  ctx.onBuildStart(() => {
    console.log('编译开始！')
  })

  // 编译中修改 webpack 配置，在这个钩子中，你可以对 webpackChain 作出想要的调整，等同于配置 webpackChain
  ctx.modifyWebpackChain(() => {})

  // 注册插件方法
  ctx.registerMethod({
    name: 'methodName',
    fn: () => {
      // callback
    },
  })

  ctx.registerCommand({
    // 命令名
    name: 'upload',
    // 执行 taro upload --help 时输出的 options 信息
    optionsMap: {
      '--remote': '服务器地址',
    },
    // 执行 taro upload --help 时输出的使用例子的信息
    synopsisList: ['taro upload --remote xxx.xxx.xxx.xxx'],
    async fn() {
      const {remote} = ctx.runOpts
      console.log('remote', remote)
      // eslint-disable-next-line no-undef
      await uploadDist()
    },
  })

  ctx.onBuildFinish(() => {
    console.log('编译结束！')
  })
}
