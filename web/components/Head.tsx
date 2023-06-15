import Head from 'next/head';
import Script from 'next/script';

function IndexPage() {
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="shortcut icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <meta name="theme-color" content="#000000" />
                <title>PathMatch - Employer</title>
            </Head>
            <Script id="SalesLoft" type="text/javascript">
                {`(function(i,s,o,g,r,a,m){i['SLScoutObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://scout-cdn.salesloft.com/sl.js','slscout');
    slscout(["init", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0IjoxMDk2MDZ9.sgGmUv5IaKH_47UiUCnqOuz21AaFoYYcBv9Pc-xWXj4"]);`}
            </Script>
        </div>
    );
}
export default IndexPage;
