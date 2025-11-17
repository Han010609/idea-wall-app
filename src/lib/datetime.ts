import { formatDistanceToNow } from "date-fns";
import { zhTW } from "date-fns/locale";

export function humanizeTime(input: string) {
  try {
    return formatDistanceToNow(new Date(input), {
      addSuffix: true,
      locale: zhTW
    });
  } catch {
    return "剛剛";
  }
}


