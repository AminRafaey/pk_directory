import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { umamiCollectProxyUrl, umamiScript, umamiSiteId } from "utils";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head>
          {/* OLD GA */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-169853688-1"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-169853688-1');
            `,
            }}
          />

          {/* New GA */}
          <script
            async
            defer
            data-host-url={umamiCollectProxyUrl}
            data-website-id={umamiSiteId}
            data-domains="school.dojo.plus"
            src={umamiScript}
          ></script>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-JC7DT6T7F2"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JC7DT6T7F2');
          `,
            }}
          />

          {/* Hotjar */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:2264968,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
