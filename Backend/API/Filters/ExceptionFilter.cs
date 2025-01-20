using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Filters
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var statusCode = StatusCodes.Status500InternalServerError;
            var message = context.Exception.Message;
            var exceptionType = context.Exception.GetType().Name;
            var timestamp = DateTime.UtcNow;

            if (context.Exception is ArgumentOutOfRangeException || context.Exception is ArgumentException)
            {
                statusCode = StatusCodes.Status400BadRequest;
            }
            else if (context.Exception is UnauthorizedAccessException)
            {
                statusCode = StatusCodes.Status401Unauthorized;
            }
            else if (context.Exception is KeyNotFoundException)
            {
                statusCode = StatusCodes.Status404NotFound;
            }

            context.Result = new ObjectResult(new
            {
                message,
                exceptionType,
                timestamp
            })
            {
                StatusCode = statusCode
            };
            context.ExceptionHandled = true;
        }
    }
}
