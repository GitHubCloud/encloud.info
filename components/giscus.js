import Giscus from '@giscus/react';

export default () => {
  return (
    <>
      <hr />
      <Giscus
        id="comments"
        repo="GitHubCloud/encloud.info"
        repoId="R_kgDOJB17CQ"
        category="General"
        categoryId="DIC_kwDOJB17Cc4CUkPG"
        mapping="pathname"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="en"
      />
    </>
  )
}