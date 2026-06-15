export function generateReport(violations) {
  const totalViolations = violations.length;

  return {
    status: totalViolations === 0 ? 'PASS' : 'FAIL',
    violations,
    summary: {
      totalViolations
    }
  };
}

export function logReport(reportObj) {
  if (process.env.PRETTY_LOGS === 'true' || process.argv.includes('--pretty')) {
    if (reportObj.status === 'PASS') {
      console.log('\x1b[32m%s\x1b[0m', '✓ Architecture Validation Passed');
    } else {
      console.log(
        '\x1b[31m%s\x1b[0m',
        `✗ Validation Failed: ${reportObj.summary.totalViolations} violations found\n`
      );
      reportObj.violations.forEach((v, i) => {
        console.log(`\x1b[33m${i + 1}. [${v.severity}] ${v.rule}\x1b[0m`);
        console.log(`   File: ${v.file}`);
        console.log(`   Fix:  ${v.message}\n`);
      });
    }
  } else {
    // Strict JSON for agents
    console.log(JSON.stringify(reportObj, null, 2));
  }
}
