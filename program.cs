using System;
using System.Net.Http;
using System.Threading.Tasks;

public class Program
{
    public static async Task Main(string[] args)
    {
        // Make HTTP request to your domain
        var url = "https://elparadisogonzalo.com";
        using var httpClient = new HttpClient();

        try
        {
            var response = await httpClient.GetAsync(url);
            var content = await response.Content.ReadAsStringAsync();

            Console.WriteLine("Response from elparadisogonzalo.com:");
            Console.WriteLine(content);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error connecting to domain:");
            Console.WriteLine(ex.Message);
        }

        // Call your existing LINQ methods
        WhereClause1.QuerySyntaxExample();
        WhereClause1.MethodSyntaxExample();
    }
}
