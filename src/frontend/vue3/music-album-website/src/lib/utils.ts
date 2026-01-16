
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 合并多个类名字符串，并去除重复的 Tailwind CSS 类。
 *
 * @param inputs - 一个或多个类名字符串，可以是字符串、对象或数组。
 * @returns 返回合并后的类名字符串。
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { cn }
