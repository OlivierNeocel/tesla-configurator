import {inject} from "@angular/core";
import {LocalStorageService} from "ngx-webstorage";
import {SELECTED_CONFIG_KEY} from "../shared/constants/local-storage-keys";

export const SummaryGuard = (): boolean => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  return localStorageService.retrieve(SELECTED_CONFIG_KEY) !== null;
}
