import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appURL).setProject(conf.appProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        conf.appDatabaseId,
        conf.appCollectionId,
        slug, // document ID
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log("Error creating post:", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appDatabaseId,
        conf.appCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Error updating post:", error);
    }
  }

  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        conf.appDatabaseId,
        conf.appCollectionId,
        slug
      );
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appDatabaseId,
        conf.appCollectionId,
        slug
      );
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return this.databases.listDocuments(
        conf.appDatabaseId,
        conf.appCollectionId,
        queries
      );
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.appBucketId, ID.unique(), file);
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appBucketId, fileId);
    } catch (error) {
      console.log("Error deleting file:", error);
    }
  }

  getFilePreview(fileId) {
    try {
      const previewFile = this.bucket.getFilePreview(conf.appBucketId, fileId);
      return previewFile;
    } catch (error) {
      console.log("Error fetching file preview:", error);
    }
  }

  getFileView(fileId) {
    try {
      const file = this.bucket.getFileView(conf.appBucketId, fileId);
      return file;
    } catch (error) {
      console.log("Error fetching file view:", error);
    }
  }
}

const service = new Service();
export default service;
