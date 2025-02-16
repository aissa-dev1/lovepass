import { AuthTokenService } from "./auth-token";
import { BootStrapService } from "./bootstrap";
import { CardsService } from "./cards";

class Services {
  readonly bootstrap = new BootStrapService();
  readonly cards = new CardsService();
  readonly authToken = new AuthTokenService();
}

export const services = new Services();
