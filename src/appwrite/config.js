import conf from "../conf/conf";
import { Client, TablesDB, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  tablesDB;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appURL).setProject(conf.appProjectId);
    this.tablesDB = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appDatabaseId,
        tableId: conf.appTableId,
        rowId: slug, // document ID
        data: {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.log("Error creating post:", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.upsertRow({
        databaseId: conf.appDatabaseId,
        tableId: conf.appTableId,
        rowId: slug, // document ID
        data: {
          title,
          slug,
          featuredImage,
          status,
          content,
          userId,
        },
      });
    } catch (error) {
      console.log("Error updating post:", error);
    }
  }

  async deletePost(slug) {
    try {
      return await this.tablesDB.deleteRow({
        databaseId: conf.appDatabaseId,
        tableId: conf.appTableId,
        rowId: slug, // document ID
      });
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  }

  async getPost(slug) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.appDatabaseId,
        tableId: conf.appTableId,
        rowId: slug, // document ID
      });
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return this.tablesDB.listRows({
        databaseId: conf.appDatabaseId,
        tableId: conf.appTableId,
        queries: queries,
      });
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appBucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile({
        bucketId: conf.appBucketId,
        fileId: fileId,
      });
    } catch (error) {
      console.log("Error deleting file:", error);
    }
  }

  getFilePreview(fileId) {
    try {
      const previewFile = this.bucket.getFilePreview({
        bucketId: conf.appBucketId,
        fileId: fileId,
      });
      return previewFile;
    } catch (error) {
      console.log("Error fetching file preview:", error);
    }
  }

  getFileView(fileId) {
    try {
      const file = this.bucket.getFileView({
        bucketId: conf.appBucketId,
        fileId: fileId,
      });
      return file;
    } catch (error) {
      console.log("Error fetching file view:", error);
    }
  }
}

const service = new Service();
export default service;
