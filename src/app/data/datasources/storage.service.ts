import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async set<T>(key: string, value: T): Promise<void> {
    const storage = await this.ready();
    await storage?.set(key, value);
  }

  async get<T>(key: string): Promise<T | null> {
    const storage = await this.ready();
    return (await storage?.get(key)) ?? null;
  }

  async remove(key: string): Promise<void> {
    await this._storage?.remove(key);
  }

  async clear(): Promise<void> {
    await this._storage?.clear();
  }

  private async ready(): Promise<Storage> {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
    return this._storage;
  }
}
