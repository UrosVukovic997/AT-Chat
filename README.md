# AT-Chat
Agentske tehnologije

Frontend:
Angular 
Pokretanje servera komandom u Cli:
-npm start

Backend:

Potrebno je onemoguciti CORS u pretrazivacu ili izmeniti Standalone fajl u WildFly servera:
```
 <host name="default-host" alias="localhost">
            <location name="/" handler="welcome-content"/>
            <filter-ref name="server-header"/>
            <filter-ref name="x-powered-by-header"/>
            <filter-ref name="Access-Control-Allow-Origin"/>
            <filter-ref name="Access-Control-Allow-Methods"/>
            <filter-ref name="Access-Control-Allow-Headers"/>
            <filter-ref name="Access-Control-Allow-Credentials"/>
            <filter-ref name="Access-Control-Max-Age"/>
        </host>
         <filters>
        <response-header name="server-header" header-name="Server" header-value="WildFly/10"/>
        <response-header name="x-powered-by-header" header-name="X-Powered-By" header-value="Undertow/1"/>
        <response-header name="Access-Control-Allow-Origin" header-name="Access-Control-Allow-Origin" header-value="*"/>
        <response-header name="Access-Control-Allow-Methods" header-name="Access-Control-Allow-Methods" header-value="GET, POST, OPTIONS, PUT, DELETE"/>
        <response-header name="Access-Control-Allow-Headers" header-name="Access-Control-Allow-Headers" header-value="accept, authorization, content-type, x-requested-with"/>
        <response-header name="Access-Control-Allow-Credentials" header-name="Access-Control-Allow-Credentials" header-value="true"/>
        <response-header name="Access-Control-Max-Age" header-name="Access-Control-Max-Age" header-value="1"/>
    </filters>
```
