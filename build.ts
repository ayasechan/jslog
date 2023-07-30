import esbuild from 'esbuild';

const config: {buildopts: esbuild.BuildOptions} = {
  buildopts: {
    entryPoints: ["src/index.ts"],
    outfile: "dist/index.js",
    sourcemap: "inline",
    bundle: true,
  }
}

const main = async () => {
  if (process.env.DEV){
    const ctx = await esbuild.context(config.buildopts)
    await ctx.watch()
  } else {
    esbuild.build(config.buildopts)
  }
}

main()