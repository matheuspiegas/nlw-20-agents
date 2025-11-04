import dayjslib from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"

dayjslib.locale("pt-br")
dayjslib.extend(relativeTime)

export const dayjs = dayjslib
