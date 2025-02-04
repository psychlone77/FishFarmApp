namespace BlobStorage.Interfaces
{
    public interface IBlobStorage
    {
        public Task<Uri> UploadFile(string containerName, string fileName, Stream content);
        public Task DeleteFile(string containerName, string fileName);
        public Task DeleteFileGivenUrl(string url);
    }
}
