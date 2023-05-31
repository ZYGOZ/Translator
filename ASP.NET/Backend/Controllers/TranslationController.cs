using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TranslationController : ControllerBase
    {
        private const string TranslatorTextEndpoint = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0";
        
        [HttpPost]
        public async Task<IActionResult> TranslateText([FromBody] TranslationRequest request)
        {
            if (string.IsNullOrEmpty(request.Text) || string.IsNullOrEmpty(request.TargetLanguage))
            {
                return BadRequest("Text and TargetLanguage are required.");
            }

            string subscriptionKey = "17d62fbb989246d78f76954885a0c2ea";
            string subscriptionRegion = "eastus";
            string endpoint = TranslatorTextEndpoint + "&to=" + request.TargetLanguage;

            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", subscriptionKey);
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Region", subscriptionRegion);

                var content = new[]
                {
                new { Text = request.Text }
            };

                var response = await client.PostAsJsonAsync(endpoint, content);
                if (response.IsSuccessStatusCode)
                {

                    var responseString = await response.Content.ReadAsStringAsync();
                    var translations = JsonConvert.DeserializeObject<TranslationResponse[]>(responseString);
                    var translatedText = translations[0].Translations[0].Text;
                    return Ok(translatedText);
                }
                else
                {
                    return BadRequest("Translation failed. Status code: " + response.StatusCode);
                }
            }
        }
    }

    public class TranslationRequest
    {
        public string Text { get; set; }
        public string TargetLanguage { get; set; }
    }

    public class TranslationResponse
    {
        public DetectedLanguage DetectedLanguage { get; set; }
        public Translation[] Translations { get; set; }
    }

    public class DetectedLanguage
    {
        public string Language { get; set; }
        public float Score { get; set; }
    }

    public class Translation
    {
        public string Text { get; set; }
        public string To { get; set; }
    }
}