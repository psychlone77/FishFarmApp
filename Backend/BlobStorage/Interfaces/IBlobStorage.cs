namespace BlobStorage.Interfaces
{
    public interface IBlobStorage
    {
        public Task<Uri> UploadFile(string containerName, string fileName, Stream content);
    }
}
