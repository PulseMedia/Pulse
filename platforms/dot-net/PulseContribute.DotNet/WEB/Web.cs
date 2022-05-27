using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace PulseContribute.DotNet.Net
{
    public static class Web
    {

        public static async void AsyncInternalFetch(string promiseId, string url, string optionsJson)
        {

            using var client = new HttpClient();
            
             System.Diagnostics.Debug.WriteLine("UA: " + App.UserAgent);
            client.DefaultRequestHeaders.TryAddWithoutValidation("User-Agent", App.UserAgent);
            JsonObject options = new JsonObject(optionsJson);
            //Dictionary<string, object> options = (Dictionary<string, object>)JSON.Parse(optionsJson);
            string requestMethod = options.OptString("method", "GET");

            JsonObject customHeader = options.OptJsonObject("header");

            if(customHeader != null)
            {
                foreach (KeyValuePair<string, object> entry in customHeader.raw)
                {
                    if(entry.Value is string)
                    {
                        client.DefaultRequestHeaders.TryAddWithoutValidation(entry.Key, (string)entry.Value);
                    }
                }
            }

            HttpResponseMessage? response = null;

            switch (requestMethod)
            {
                case "GET":
                    response = await client.GetAsync(url);
                    break;
                case "POST":
                    ByteArrayContent postContext = new ByteArrayContent(Encoding.ASCII.GetBytes(options.OptString("body", "")));
                    response = await client.PostAsync(url, postContext);
                    break;
                case "HEAD":
                    response = await client.SendAsync(new HttpRequestMessage(HttpMethod.Head, url));
                    break;
                case "PUT":
                    ByteArrayContent putContext = new ByteArrayContent(Encoding.ASCII.GetBytes(options.OptString("body", "")));
                    response = await client.PutAsync(url, putContext);
                    break;
                case "DELETE":
                    response = await client.DeleteAsync(url);
                    break;
                case "PATCH":
                    ByteArrayContent patchContext = new ByteArrayContent(Encoding.ASCII.GetBytes(options.OptString("body", "")));
                    response = await client.PatchAsync(url, patchContext);
                    break;
                case "TRACE":
                case "OPTIONS":
                default:
                    break;
            }
            
            if (response != null)
            {
                HttpResponseHeaders headers = response.Headers;
                Dictionary<string, object> respHeader = new Dictionary<string, object>();

                foreach (KeyValuePair<string, IEnumerable<string>> myHeader in headers)
                {
                    if (myHeader.Value.Count() > 1)
                    {
                        List<string> subheaders = new List<string>();
                        foreach (string subheader in myHeader.Value)
                        {
                            subheaders.Add(subheader);
                        }
                        respHeader.Add(myHeader.Key, subheaders.ToArray());
                    }
                    else
                    {
                        foreach (string subheader in myHeader.Value)
                        {
                            respHeader.Add(myHeader.Key, subheader);
                        }
                    }
                }
                string responseBody = await response.Content.ReadAsStringAsync();
                response.Dispose();
                client.Dispose();
                Promise.Create(promiseId).ResolveObject("FETCH_RESPONSE", new Dictionary<string, object>
                {
                    { "status", response.StatusCode },
                    { "body", responseBody },
                    { "header", respHeader }
                });
            } else
            {
                client.Dispose();
                Promise.Create(promiseId).ResolveObject("FETCH_RESPONSE", new Dictionary<string, object>
                {
                    { "status", 400 },
                    { "body", "" },
                    { "header", new Dictionary<string, object>() }
                });
            }
        }

    }
}
