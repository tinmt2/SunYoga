$path = 'src/store/useGymStore.js'
$text = Get-Content $path -Raw
$text = $text -replace "const getDefaultState = \(\) => \(\{([\s\S]*?)plans: defaultPlans,([\s\S]*?)\}\);", "const getDefaultState = () => ({$1plans: defaultPlans,`n  classes: defaultClasses,${2}});"
$text = $text -replace "const DEFAULT_GRACE_DAYS = 3;", "const DEFAULT_GRACE_DAYS = 3;`n`n// Default classes`nconst defaultClasses = [`n  { id: 'cls-morning', name: 'Sang' },`n  { id: 'cls-evening', name: 'Chieu' },`n];"
$text = $text -replace "addStudent: \(\{([\s\S]*?)price,\s*\}\) => \{", "addStudent: ({$1price, classes = [],}) => {"
$text = $text -replace "membership,\s*\}\;", "membership,`n          classes: Array.isArray(classes) ? classes : [],`n        };"

# Add class APIs if not present
if ($text -notmatch 'addClass:') {
  $insertAfter = 'updateStudent: (studentId, patch) => {'
  $idx = $text.IndexOf($insertAfter)
  if ($idx -ge 0) {
    $before = $text.Substring(0, $text.IndexOf('},', $idx)+2)
    $after = $text.Substring($text.IndexOf('},', $idx)+2)
    $apis = @"
      ,
      // Classes management
      addClass: (name) => set((state) => ({
        ...state,
        classes: [...state.classes, { id: createId(), name: name.trim() }],
      })),
      renameClass: (classId, name) => set((state) => ({
        ...state,
        classes: state.classes.map((c) => (c.id === classId ? { ...c, name: name.trim() } : c)),
      })),
      deleteClass: (classId) => set((state) => ({
        ...state,
        classes: state.classes.filter((c) => c.id !== classId),
        students: state.students.map((s) => ({
          ...s,
          classes: (s.classes ?? []).filter((cid) => cid !== classId),
        })),
      })),
      assignStudentToClass: (studentId, classId) => set((state) => ({
        ...state,
        students: state.students.map((s) => (s.id === studentId ? { ...s, classes: Array.from(new Set([...(s.classes ?? []), classId])) } : s)),
      })),
      removeStudentFromClass: (studentId, classId) => set((state) => ({
        ...state,
        students: state.students.map((s) => (s.id === studentId ? { ...s, classes: (s.classes ?? []).filter((cid) => cid !== classId) } : s)),
      })),
"@
    $text = $before + $apis + $after
  }
}
Set-Content $path $text -Encoding UTF8
