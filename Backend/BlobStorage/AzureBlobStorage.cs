using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using BlobStorage.Interfaces;
using Microsoft.Extensions.Configuration;

namespace BlobStorage
{
    public class AzureBlobStorage(string connectionString) : IBlobStorage
    {
        private readonly BlobServiceClient _blobServiceClient = new BlobServiceClient(connectionString);

        private BlobContainerClient GetContainerClient(string containerName)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
            containerClient.CreateIfNotExists(PublicAccessType.Blob);
            return containerClient;
        }

        public async Task<Uri> UploadFile(string containerName, string fileName, Stream content)
        {
            var containerClient = GetContainerClient(containerName);
            var blobClient = containerClient.GetBlobClient(fileName);
            await blobClient.UploadAsync(content);
            return blobClient.Uri;
        }

        public async Task DeleteFile(string containerName, string fileName)
        {
            var containerClient = GetContainerClient(containerName);
            var blobClient = containerClient.GetBlobClient(fileName);
            await blobClient.DeleteIfExistsAsync();
        }
    }
}
