param(
     [Parameter()]
     [string]$GitHubDestinationPAT,
 
     [Parameter()]
     [string]$AzureDevOpsPAT
 )

Write-Host ' - - - - - - - - - - - - - - - - - - - - - - - - -'
Write-Host ' Azure Devops changes to GitHub repo'
Write-Host ' - - - - - - - - - - - - - - - - - - - - - - - - - '
$AzureRepoName = "Virtual-Seat-Dispatcher"
$ADOCloneURL = "dev.azure.com/VSD-Sandbox/Virtual-Seat-Dispatcher/_git/Virtual-Seat-Dispatcher"
$GitHubCloneURL = "github.com/brezden/Virtual-Seat-Dispatcher.git"
$stageDir = pwd | Split-Path
Write-Host "Stage Dir: $stageDir"
$githubDir = $stageDir +"\"+"gitHub"
Write-Host "Github Dir: $githubDir"
$destination = $githubDir+"\"+ $AzureRepoName+".git"
Write-Host "Destination: $destination"
$sourceURL = "https://$($AzureDevOpsPAT)"+"@"+"$($ADOCloneURL)"
write-host "Source URL : $sourceURL"
$destURL = "https://" + $($GitHubDestinationPAT) +"@"+"$($GitHubCloneURL)"
write-host "Destination URL : $destURL"
if((Test-Path -path $githubDir))
{
  Remove-Item -Path $githubDir -Recurse -force
}
if(!(Test-Path -path $githubDir))
{
  New-Item -ItemType directory -Path $githubDir
  Set-Location $githubDir
  git clone --mirror $sourceURL
}
else
{
  Write-Host "The given folder path $githubDir already exists";
}
Set-Location $destination
Write-Output '*****git removing remote secondary****'
git remote rm secondary
Write-Output '*****git remote add****'
git remote add --mirror=fetch secondary $destURL
Write-Output '*****git fetch origin****'
git fetch $sourceURL
Write-Output '*****git Push****'
git push secondary  --all -f
Write-Output '**Azure Devops Repo synced with Github Repo**'
Set-Location $stageDir
if((Test-Path -path $githubDir))
{
 Remove-Item -Path $githubDir -Recurse -force
}
write-host "Job completed"