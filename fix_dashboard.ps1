$path = 'src/screens/DashboardScreen.js'
$text = Get-Content $path -Raw
$text = $text -replace 'import \{ useMemo \} from "react";','import { useMemo, useState } from "react";'
$text = $text -replace 'import \{ Alert, ScrollView, StyleSheet, Text, View \} from "react-native";','import { Alert, ScrollView, StyleSheet, Text, View, Pressable } from "react-native";'
$text = $text -replace '\} from "\.\.\/utils\/invoiceHelpers";`r`nimport ClassesModal from "\.\.\/components\/ClassesModal";','} from "../utils/invoiceHelpers";`nimport ClassesModal from "../components/ClassesModal";'
$text = $text -replace '\[showClasses, setShowClasses\] = useState\(false\);\\r\\n\s*return \(\\r\\n\s*<ScrollView','[showClasses, setShowClasses] = useState(false);`n  return (`n    <ScrollView'
Set-Content $path $text -Encoding UTF8
