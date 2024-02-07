import {inject} from "@angular/core";
import {LocalStorageService} from "ngx-webstorage";
import {SELECTED_MODEL_KEY} from "../shared/constants/local-storage-keys";

export const ConfigGuard = (): boolean => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  return localStorageService.retrieve(SELECTED_MODEL_KEY) !== null
    && localStorageService.retrieve(SELECTED_MODEL_KEY) !== null;
}
