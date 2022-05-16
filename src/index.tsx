import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl2p6qkin4fr301xrhgne6phk/master',
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTE3NjA4OTUsImF1ZCI6WyJodHRwczovL2FwaS1zYS1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2NsMnA2cWtpbjRmcjMwMXhyaGduZTZwaGsvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMjNhZmEwODgtNWMyMC00MWIzLTk2NDctNjFmYTQwZWQ5YjA0IiwianRpIjoiY2wydDNzZzQ0M2QwdzAxdzYwdGd3OWwxcSJ9.g35K_wTC_wl1-WHfFGE3RXERsVQ8jGP-p-fQtax8CMF7THQx-u1mOh9JChb7u0SOd-9M6mv7CGLcc5WofOE2mjIiqyJXpR0HpOlTb_Ci-SOkWWtV1QrWVllUcQXM-rLsesfPM_Kwqg0PrXa2Fw4UlMHy8v00hV6mhtTlUgFyEejab58PbVg7rF7ElAF3BMruK_PeGy6g63iX23quj1dpDTG7YhLx2qn7hGI5Aq1oHJBH8V3bzwg3A_cflsEF8Aa5Dcy0E-dhISZu_htqmnb2R7InSpNvlBsQ7RVOGeD6xw0R76y3IPkt5W29blNgGM-_45ypszVRZ8UDRexp1SXpp5SxmrwpywZTnK0WupxYf9Xo4jw29v69GFg-ietqE-vM5T4zO4G7IRpFuH-QNrbt2M5Io8mAj2RuupvTTlhrxQGQ8QvF310B0u9pFTvq27DyyxcOzp6SRJBnqgror87AnGzimVmHZSutoO0VnzJ0WR7qYeLbN31Vupd8vawmGAV8IpJiapeA8T3zjJN-CEqz3K8BUGSZms4ljfaWDZfcr-EiFDNB93V0SlJcSZoCQltxx8RQffOJ1UuZelrJkiiYSpszH4ZAa9E1ClrCliE-INVR5pIVHSmwXD2GUcLdhseloSA92esfjF6zSMJ94qlBM-gvxQu8_3osEpsOJ0IUAa8',
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
