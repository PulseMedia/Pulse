using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulseContributeWinForms
{
    public static class JSON
    {
        public static object Parse(string json)
        {
            if (json == null || json.Length == 0)
            {
                return new Dictionary<string, object>();
            }
            return toObject(JToken.Parse(json));
        }

        public static string Stringify(object obj)
        {
            if (obj is Array)
            {
                return ((JArray)JToken.FromObject(obj)).ToString();
            }
            return ((JObject)JToken.FromObject(obj)).ToString();
        }

        private static object toObject(JToken token)
        {
            switch (token.Type)
            {
                case JTokenType.Object:
                    return token.Children<JProperty>()
                                .ToDictionary(prop => prop.Name,
                                              prop => toObject(prop.Value));

                case JTokenType.Array:
                    return token.Select(toObject).ToList();

                default:
                    return ((JValue)token).Value;
            }
        }

    }
}
